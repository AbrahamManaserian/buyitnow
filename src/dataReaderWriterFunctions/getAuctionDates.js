import { format } from 'date-fns';

let date = new Date();
export const checkDate = (num) => {
  let str = '1';

  if (num === 0) {
    if (date.getDay() === 6) {
      let newDate = new Date(+date + 2 * 24 * 60 * 60 * 1000);
      str = format(newDate, 'uuuuMMdd');
      return str;
    } else if (date.getDay() === 0) {
      let newDate = new Date(+date + 24 * 60 * 60 * 1000);
      str = format(newDate, 'uuuuMMdd');
      return str;
    }
    str = format(date, 'uuuuMMdd');
    return str;
  }
  if (date.getDay() === 5 || date.getDay() === 6) {
    let newDate = new Date(+date + (2 + num) * 24 * 60 * 60 * 1000);
    str = format(newDate, 'uuuuMMdd');
  } else if (date.getDay() === 0) {
    let newDate = new Date(+date + (1 + num) * 24 * 60 * 60 * 1000);
    str = format(newDate, 'uuuuMMdd');
  } else {
    let newDate = new Date(+date + num * 24 * 60 * 60 * 1000);
    str = format(newDate, 'uuuuMMdd');
  }
  // console.log(str);
  return str;
};
