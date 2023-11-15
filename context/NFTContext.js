import React, { useEffect, useState } from 'react';
import { useStorageUpload } from '@thirdweb-dev/react';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
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

  const uploadToIpfs = async (file) => {
    let url = '';
    try {
      url = await upload({
        data: file,
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      });
    } catch (error) {
      console.log('Error uploading to IPFS.', error);
    }

    return url;
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIpfs }}>
      {children}
    </NFTContext.Provider>
  );
};
