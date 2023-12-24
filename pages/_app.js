import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

import '../styles/globals.css';
import { Navbar, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';

const activeChainId = ChainId.Goerli;

const MyApp = ({ Component, pageProps }) => (
  <ThirdwebProvider desiredChainId={activeChainId} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
    <NFTProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>

        <Script src="https://kit.fontawesome.com/5946e66caa.js" crossorigin="anonymous" />
      </ThemeProvider>
    </NFTProvider>
  </ThirdwebProvider>
);

export default MyApp;
