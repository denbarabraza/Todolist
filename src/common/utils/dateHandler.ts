import dayjs from 'dayjs';

export const dateHandler = (date: Date | string) => {
  return dayjs(date).format('DD.MM.YYYY');
};
