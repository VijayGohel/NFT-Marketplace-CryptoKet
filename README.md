## CryptoKet - Web3 Blockchain and Advanced NFT Marketplace App

[Live Demo](https://cryptoket-tau.vercel.app/)

![NFT Marketplace](https://media.graphassets.com/output=format:jpg/M5b4PwytRxmthXO6YOZ4)

## 🤖 Introduction
NFT marketplace application where clients can purchase, sell, find, and make their own NFTs within a Web3.0, blockchain-based stage.

## ⚙️ Tech Stack

- Next.js
- Context API
- TailwindCSS
- Axios
- Thirdweb
- IPFS
- ESlint
- Hardhat
- Solidity
- Ethereum Smart Contracts

## 🔋 Features

👉 **Authentication with MetaMask:** User management through MetaMask, ensuring secure and efficient authentication.
        
👉 **Themes:** Provided toggle between light & dark themes to ensure best user experience. 
    
👉 **Create NFTs:** Create and list NFTS on market place that can be explored by all users.

👉 **Buy NFTs:** Users can buy listed NFTs from market place.

👉 **Resell NFTs:** Bought NFTs can be listed back for sell to market place.

 👉 **Search & Sort NFTs:** NFTs can be searched using search bar and various sort options provided to display NFTs in desired order.

 👉 **Store NFTs on IPFS:** IPFS decentralized web storage is used to store NFTs in decentralized manner.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Deploy Smart Contract to LocalHost**

Configure `hardhat.config.js` file to use local blockchain network. Use chain id 1337 for local network.

```bash
npx hardhat node
npx hardhat run .\scripts\deploy.js --network localhost
```

Note deployed Smart Contract address.

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_MARKET_ADDRESS = smart_contract_address
NEXT_PUBLIC_THIRDWEB_CLIENT_ID = thirdweb_client_id_for_ipfs
```

Replace the placeholder values with your actual credentials 

**Running the Project**

Make sure local blockchain network is running.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
 
