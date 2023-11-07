import React, { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';
import { makeId } from '../utils/makeId';
import { Banner, CreatorCard } from '../components';

const Home = () => {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
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

          <div className="relative flex-1 max-w-full flex-mt-3" ref={parentRef}>
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
              <div className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer">
                <Image
                  src={Images.left}
                  layout="fill"
                  objectFit="contain"
                  alt="left-arrow"
                  className={theme === 'light' && 'invert filter'}
                />
              </div>
              <div className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer">
                <Image
                  src={Images.right}
                  layout="fill"
                  objectFit="contain"
                  alt="left-arrow"
                  className={theme === 'light' && 'invert filter'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
