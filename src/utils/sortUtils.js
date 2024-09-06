export const sortByDate = (posts, order = 'desc') => {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (order === 'asc') {
      return dateA - dateB;
    }
    return dateB - dateA;
  });
};
