export const shortenAddress = (address) => (address?.length > 10 ? `${address.slice(0, 5)}...${address.slice(address.length - 4)}` : address);
