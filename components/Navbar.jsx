import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

import images from '../assets';
import Button from './Button';
import { NFTContext } from '../context/NFTContext';

const navLinks = {
  'Explore NFTs': '/',
  'Listed NFTs': '/listed-nfts',
  'My NFTs': '/my-nfts',
};

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => (
  <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
    {Object.keys(navLinks).map((item, index) => (
      <li
        onClick={() => {
          setActive(item);
          if (isMobile) { setIsOpen(false); }
        }}
        key={`${item} ${index}`}
        className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item ? 'dark:text-white text-nft-black-1' : 'dark:text-nft-gray-3 text-nft-gray-2'}`}
      >
        <Link href={navLinks[item]}>{item}</Link>
      </li>
    ))}
  </ul>
);

const ButtonGroup = ({ router, setActive, setIsOpen }) => {
  const { currentAccount, connectWallet } = useContext(NFTContext);

  return (
    <Button
      btnName={`${currentAccount ? 'Create' : 'Connect'}`}
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        if (currentAccount) {
          setActive('');
          if (setIsOpen) { setIsOpen(false); }
          router.push('/create-nft');
        } else {
          connectWallet();
        }
      }}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [activeLink, setActiveLink] = useState(Object.keys(navLinks)[0]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const checkActive = (pathName) => {
    let active = '';
    Object.entries(navLinks).forEach(([DisplayName, URL]) => {
      if (URL === pathName) {
        active = DisplayName;
      }
    });

    setActiveLink(active);
  };

  useEffect(() => {
    if (!localStorage.getItem('theme')) { setTheme('dark'); }
  }, []);

  useEffect(() => {
    checkActive(router.pathname);
  }, [router.pathname]);

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
          <div className="hidden md:flex" onClick={() => setIsOpen(false)}>
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
          <div className="ml-4">
            <ButtonGroup router={router} setActive={setActiveLink} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        <Image
          src={isOpen ? images.cross : images.menu}
          width={isOpen ? 20 : 25}
          height={isOpen ? 20 : 25}
          objectFit="contain"
          alt="cross icon"
          onClick={() => setIsOpen(!isOpen)}
          className={theme === 'light' ? 'filter invert' : null}
        />
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={activeLink} setActive={setActiveLink} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup router={router} setActive={setActiveLink} setIsOpen={setIsOpen} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
