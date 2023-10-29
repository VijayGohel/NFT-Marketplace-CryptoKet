import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import images from '../assets';

const Navbar = () => (
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
  </nav>
);

export default Navbar;
