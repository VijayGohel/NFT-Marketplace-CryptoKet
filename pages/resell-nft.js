import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

import { Button, Input, Loader } from '../components';
import { NFTContext } from '../context/NFTContext';

const ResellNFT = () => {
  const router = useRouter();
  const [nftDetails, setNFTDetails] = useState({ tokenId: '', tokenURI: '', image: '' });
  const [price, setPrice] = useState('');
  const { createSale, isLoadingNFT } = useContext(NFTContext);

  const fetchNFT = async () => {
    if (!nftDetails.tokenURI) return;
    const { data } = await axios.get(nftDetails.tokenURI);

    setNFTDetails({ ...nftDetails, image: data.image || '' });
    setPrice(data.price || '');
  };

  useEffect(() => {
    if (!router.isReady) return;
    setNFTDetails(router.query);
  }, [router.isReady]);

  useEffect(() => {
    fetchNFT();
  }, [nftDetails.tokenURI]);

  const resell = async () => {
    await createSale(nftDetails.tokenURI, price, true, nftDetails.tokenId);
    router.push('/');
  };

  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">Resell NFT</h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {nftDetails.image && <div className="relative mt-4"><Image src={nftDetails.image} className="rounded-xl" width={350} height={350} objectFit="contain" /></div>}

        <div className="mt-7 w-full flex justify-center">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
