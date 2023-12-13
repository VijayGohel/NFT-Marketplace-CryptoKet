export const getTopCreators = (nfts) => {
  const creators = nfts.reduce((creatorObj, nft) => {
    const creator = creatorObj[nft.seller] || [];
    creator.push(nft);
    return { ...creatorObj, [nft.seller]: creator };
  }, {});

  const topCreators = Object.keys(creators).map((creator) => {
    const seller = creator;
    const sellerNfts = creators[creator];
    const price = sellerNfts.reduce((prev, cur) => prev + Number(cur.price), 0);

    return { seller, price: price.toFixed(4) };
  });

  return topCreators.sort((a, b) => (a.price < b.price ? 1 : -1));
};
