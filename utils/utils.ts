export const getNumberPagesByElements = (
  pageSize: number,
  totalElements: number
) =>
  pageSize > totalElements
    ? 1
    : Math.floor(totalElements / pageSize) + (totalElements % pageSize && 1);

export const formatAddresss = (addres: string) => {
  return `${addres.slice(0, 5)}...${addres.slice(addres.length - 5)}`;
};
