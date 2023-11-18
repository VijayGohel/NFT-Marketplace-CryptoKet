import React, { useContext, useEffect, useState } from 'react';

import { Loader, NFTCard } from '../components';
import { NFTContext } from '../context/NFTContext';

const ListedNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchListedNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchListedNFTs().then((items) => {
      setNfts(items || []);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (!isLoading && (!nfts || !nfts?.length)
    ? (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins font-extrabold dark:text-white text-nft-black-1 text-3xl">No NFTS listed for Sale</h1>
      </div>
    )
    : (
      <div className="flex justify-center sm:px-4 p-12 min-h-screen">
        <div className="w-full minmd:w-4/5">
          <div className="mt-4">
            <h2 className="font-poppins font-semibold dark:text-white text-nft-black-1 text-2xl mt-2 ml-4 sm:ml-2">
              NFTs listed for Sale
            </h2>

            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {nfts?.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ListedNFTs;
