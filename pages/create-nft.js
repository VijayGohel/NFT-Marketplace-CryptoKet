import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Images from '../assets';

const CreateNFT = () => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins text-nft-black-1 dark:text-white text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create NFT
        </h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
          <div className="mt-4">
            <div>
              <input />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM Max 100mb.</p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={Images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag & Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">or Browse media on your device</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
