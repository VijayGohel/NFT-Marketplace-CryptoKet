export const getTopCreators = (nfts) => {
  const creators = nfts.reduce((creatorObj, nft) => {
    if (!creatorObj[nft.seller]) {
      creatorObj[nft.seller] = [];
    }
    const creator = creatorObj[nft.seller];
    creator.push(nft);
    return creatorObj;
  }, {});

  const topCreators = Object.keys(creators).map((creator) => {
    const seller = creator;
    const sellerNfts = creators[creator];
    const price = sellerNfts.reduce((prev, cur) => prev + Number(cur.price), 0);

    return { seller, price };
  });

  return topCreators.sort((a, b) => a.price > b.price);
};
