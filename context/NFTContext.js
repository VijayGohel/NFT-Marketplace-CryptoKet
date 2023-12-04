import React, { useEffect, useState } from 'react';
import { useStorageUpload } from '@thirdweb-dev/react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MARKET_ADDRESS_ABI } from './constants';

export const NFTContext = React.createContext();

const fetchContract = (singerOrProvider) => new ethers.Contract(process.env.NEXT_PUBLIC_MARKET_ADDRESS, MARKET_ADDRESS_ABI, singerOrProvider);

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      return alert('Please install MetaMask!');
    }

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No Accounts found!');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert('Please install MetaMask!');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async (data) => {
    let url = '';
    try {
      url = await upload({
        data,
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      });
    } catch (error) {
      console.error('Error uploading to IPFS.', error);
    }

    return url;
  };

  const getContract = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  };

  const createSale = async (url, inputPrice, isReslling, id) => {
    const price = ethers.utils.parseUnits(inputPrice, 'ether');
    const contract = await getContract();
    const listingPrice = await contract.getListingPrice();
    const transaction = !isReslling
      ? await contract.createToken(url, price, { value: listingPrice.toString() })
      : await contract.resellToken(id, price, { value: listingPrice.toString() });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const createNFT = async (formInput, fileUrl, router) => {
    try {
      const { name, description, price } = formInput;
      if (!name || !description || !price || !router) return;

      const data = JSON.stringify({ name, description, image: fileUrl });
      const url = await uploadToIpfs([data]);
      await createSale(url[0], price);

      router.push('/');
    } catch (error) {
      console.error('Error creating NFT', error);
    }
  };

  const formatResponse = async (data, contract) => {
    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const { data: { image, name, description } } = await axios.get(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice, 'ether');

      return {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI,
      };
    }));

    return items;
  };

  const fetchNFTs = async () => {
    try {
      setIsLoadingNFT(false);
      const contract = await getContract();
      const data = await contract.fetchMarketItems();
      const items = await formatResponse(data, contract);
      return items;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchListedNFTsOrMyNFTs = async (type) => {
    try {
      setIsLoadingNFT(false);
      const contract = await getContract();
      const data = type === 'myNFTs' ? await contract.fetchMyNFTs() : await contract.fetchItemsListed();
      const items = await formatResponse(data, contract);
      return items;
    } catch (error) {
      console.error(error);
    }
  };

  const buyNFT = async (nft) => {
    try {
      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
      const contract = await getContract();
      const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
      setIsLoadingNFT(true);
      await transaction.wait();
      setIsLoadingNFT(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIpfs, createNFT, fetchNFTs, fetchListedNFTsOrMyNFTs, buyNFT, createSale, isLoadingNFT }}>
      {children}
    </NFTContext.Provider>
  );
};
