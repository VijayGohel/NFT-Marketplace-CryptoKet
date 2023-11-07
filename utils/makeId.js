export const makeId = (chars) => {
  const charSet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';

  for (let i = 0; i < chars; i += 1) {
    res += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  return res;
};
