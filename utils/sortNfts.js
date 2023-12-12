export const sortingFunctions = {
  'Recently added': (a, b) => b.tokenId - a.tokenId,
  'Price (low to high)': (a, b) => a.price - b.price,
  'Price (high to low)': (a, b) => b.price - a.price,
};

export const sortNfts = (nfts, option) => {
  const sortedNft = JSON.parse(JSON.stringify(nfts || [])) || [];
  sortedNft.sort(sortingFunctions[option]);
  return sortedNft;
};
