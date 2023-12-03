import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';

const SearchBar = () => {
  const [setsearchText, setSearchText] = useState('');
  const [toggle, setToggle] = useState(false);
  const theme = useTheme();

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md">
        <Image
          src={Images.search}
          height={20}
          width={20}
          alt="search"
          objectFit="contain"
          className={theme === 'light' && 'filter invert'}
        />
        <input
          type="text"
          placeholder="Seach NFT here..."
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={() => {}}
          value=""
        />
      </div>
      <div onClick={() => setToggle((prev) => !prev)} className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md">
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">Recently Listed</p>
        <Image
          src={Images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' && 'fliter invert'}
        />
        {toggle && (
        <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
          {['Recently added', 'Price (low to high)', 'Price (high to low)'].map((item, ind) => <p key={`${ind} ${item}`} className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-2 cursor-pointer">{item}</p>)}
        </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
