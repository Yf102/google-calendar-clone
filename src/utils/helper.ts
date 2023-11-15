export const getDateKey = (date: Date) => {
  return date.toISOString().split("T")[0];
};
