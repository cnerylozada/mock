export const getNumberPagesByElements = (
  pageSize: number,
  totalElements: number
) =>
  pageSize > totalElements
    ? 1
    : Math.floor(totalElements / pageSize) + (totalElements % pageSize && 1);
