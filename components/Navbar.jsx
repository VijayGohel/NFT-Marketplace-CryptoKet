import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';

const navLinks = {
  'Explore NFTs': '/',
  'Listed NFTs': '/created-nfts',
  'My NFTs': '/my-nfts',
};

const MenuItems = ({ isMobile, active, setActive }) => (
  <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
    {Object.keys(navLinks).map((item, index) => (
      <li
        onClick={() => setActive(item)}
        key={`${item} ${index}`}
        className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}
      >
        <Link href={navLinks[item]}>{item}</Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [activeLink, setActiveLink] = useState('Explore NFTs');

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 boder-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter cursor-pointer md:hidden">
            <Image src={images.logo02} width={32} height={32} alt="brand logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">Cryptoket</p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex">
            <Image src={images.logo02} width={32} height={32} alt="brand logo" />
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            id="theme-toggle"
            className="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="theme-toggle" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
        <div className="flex md:hidden">
          <MenuItems active={activeLink} setActive={setActiveLink} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
