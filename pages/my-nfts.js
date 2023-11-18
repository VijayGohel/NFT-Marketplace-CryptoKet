import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { Banner, Loader, NFTCard } from '../components';
import Images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';
import { NFTContext } from '../context/NFTContext';

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentAccount } = useContext(NFTContext);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="w-40 h-40 sm:w-36 sm:h-36 p-1 rounded-full bg-nft-black-2">
            <Image
              src={Images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins font-semibold text-2xl dark:text-white text-nft-black-1 mt-6">{shortenAddress(currentAccount)}</p>
        </div>
      </div>

      {!isLoading && (!nfts || !nfts.length) ? (
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins font-extrabold text-3xl dark:text-white text-nft-black-1">No NFTs owned</h1>
        </div>
      ) : (
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex flex-1 flex-row w-full sm:flex-col px-4 xs:px-0 minlg:px-8">Searchbar</div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts?.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;
