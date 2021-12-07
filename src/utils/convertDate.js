export const convertToDate = time => new Date(time * 1000).toLocaleString().replace(',', '');
