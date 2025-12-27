const dayCount = (rent_end_date: string, rent_start_date: string): number => {
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const msPerDay = 1000 * 60 * 60 * 24;

  const diffInMs = end.getTime() - start.getTime();

  return Math.floor(diffInMs / msPerDay) + 1 
};

export default dayCount ; 
