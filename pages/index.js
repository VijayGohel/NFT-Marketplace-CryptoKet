import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';
import { makeId } from '../utils/makeId';
import { Banner, CreatorCard, NFTCard } from '../components';

const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [hideButtons, setHideButtons] = useState(false);

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
    isScrollable();
    window?.addEventListener('resize', isScrollable);

    return () => {
      window?.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg-text-4xl font-semibold ml-4 xs:ml-0">Best Creators</h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {
                [6, 7, 8, 9, 10].map((i) => (
                  <CreatorCard
                    key={`creator-${i}`}
                    rank={i}
                    creatorImage={Images[`creator${i}`]}
                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                    creatorEths={10 - i * 0.5}
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
                        className={theme === 'light' && 'invert filter'}
                        onClick={() => handleScroll('left')}
                      />
                    </div>
                    <div className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer">
                      <Image
                        src={Images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="left-arrow"
                        className={theme === 'light' && 'invert filter'}
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
            <div>Searchbar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <NFTCard key={`NFT-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
