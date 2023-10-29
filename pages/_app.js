import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const MyApp = ({ Component, pageProps }) => (
  <div className="dark:bg-nft-dark bg-white min-h-screen">
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </div>
);

export default MyApp;
