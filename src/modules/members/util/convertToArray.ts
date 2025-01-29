export const convertToArray = (data: string): string[] => {
  return data
    .trim()
    .split(',')
    .map((item) => item.trim());
};
