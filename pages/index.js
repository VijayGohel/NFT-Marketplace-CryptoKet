import React, { useEffect, useRef, useState, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';
import { getTopCreators } from '../utils/getTopCreators';
import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from '../components';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';
import { sortNfts, sortingFunctions } from '../utils/sortNfts';
import { hexToDecimal } from '../utils/hexToDecimal';

const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [copyNfts, setCopyNfts] = useState(nfts);
  const [topCreators, setTopCreators] = useState([]);
  const [activeSelect, setActiveSelect] = useState(Object.keys(sortingFunctions)[0]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchNFTs } = useContext(NFTContext);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window?.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    const scrollable = current?.scrollWidth >= parent?.offsetWidth;
    setHideButtons(!scrollable);
  };

  useEffect(() => {
    setTopCreators(getTopCreators(copyNfts) || []);
  }, [copyNfts]);

  useEffect(() => {
    const sortedNfts = sortNfts(nfts, activeSelect);
    setNfts(sortedNfts);
  }, [activeSelect]);

  useEffect(() => {
    isScrollable();
    window?.addEventListener('resize', isScrollable);

    fetchNFTs().then((items) => {
      const sortedNfts = sortNfts(items, activeSelect);
      setNfts(sortedNfts || []);
      setCopyNfts(sortedNfts || []);
      setIsLoading(false);
    });

    return () => {
      window?.removeEventListener('resize', isScrollable);
    };
  }, []);

  const onHandleSearch = (value) => {
    const filteredNfts = copyNfts.filter((nft) => nft.name.toLowerCase().includes(value.toLowerCase()));
    if (filteredNfts.length) { setNfts(filteredNfts); } else { setNfts(copyNfts); }
  };

  const onClearSearch = () => {
    setNfts(copyNfts);
  };

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        {!isLoading && !copyNfts.length ? (
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">That&apos;s wierd... No NFTs for sale!</h1>
        ) : isLoading ? <Loader /> : (
          <>
            <div>
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg-text-4xl font-semibold ml-4 xs:ml-0">Best Creators</h1>

              <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
                <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
                  {
                    topCreators.map((creator, i) => (
                      <CreatorCard
                        key={creator.seller}
                        rank={i + 1}
                        creatorImage={Images[`creator${hexToDecimal(creator.seller)}`]}
                        creatorName={shortenAddress(creator.seller)}
                        creatorEths={creator.price}
                      />
                    ))
                  }
                  {!hideButtons
                    && (
                      <>
                        <div className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer">
                          <Image
                            src={Images.left}
                            layout="fill"
                            objectFit="contain"
                            alt="left-arrow"
                            className={theme === 'light' ? 'invert filter' : null}
                            onClick={() => handleScroll('left')}
                          />
                        </div>
                        <div className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer">
                          <Image
                            src={Images.right}
                            layout="fill"
                            objectFit="contain"
                            alt="left-arrow"
                            className={theme === 'light' ? 'invert filter' : null}
                            onClick={() => handleScroll('right')}
                          />
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Hot Bids</h1>
                <div className="flex-2 flex flex-row sm:flex-col sm:w-full">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    onClearSearch={onClearSearch}
                    onHandleSearch={onHandleSearch}
                  />
                </div>
              </div>
              <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                {nfts?.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
