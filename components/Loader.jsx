import React from 'react';
import Image from 'next/image';

import Images from '../assets';

const Loader = () => (
  <div className="flexCenter w-full my-4">
    <Image src={Images.loader} alt="loader" width={100} objectFit="contain" />
  </div>
);

export default Loader;
