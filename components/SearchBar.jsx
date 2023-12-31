import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';
import { sortingFunctions } from '../utils/sortNfts';

const SearchBar = ({ onHandleSearch, onClearSearch, activeSelect, setActiveSelect }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timeout);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) { onHandleSearch(search); } else { onClearSearch(); }
  }, [search]);

  return (
    <>
      <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md">
        <Image
          src={Images.search}
          height={20}
          width={20}
          alt="search"
          objectFit="contain"
          className={theme === 'light' ? 'filter invert' : null}
        />
        <input
          type="text"
          placeholder="Seach NFT here..."
          className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value || '')}
          value={debouncedSearch}
        />
      </div>
      <div onClick={() => setToggle((prev) => !prev)} className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 py-3 rounded-md">
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs">{activeSelect}</p>
        <Image
          src={Images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'filter invert' : null}
        />
        {toggle && (
        <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
          {Object.keys(sortingFunctions).map((item, ind) => <p key={`${ind} ${item}`} onClick={() => setActiveSelect(item)} className="font-poppins dark:text-white text-nft-black-1 font-normal text-xs my-2 cursor-pointer">{item}</p>)}
        </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
