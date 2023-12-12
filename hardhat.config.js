const fs = require('fs');
require('@nomiclabs/hardhat-waffle');

const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  defaultNetwork: 'goerli',
  networks: {
    hardhat: {},
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/ElEopJTZjT5Bd-lWo5a9sKx82li-vsYc',
      accounts: [privateKey],
    },
  },
  solidity: '0.8.4',
};
