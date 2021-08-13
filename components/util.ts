import moment from "moment";

export function lowerCaseFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function upperCaseFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDate(date: string) {
  const calendar = moment(date).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[last] ddd',
    sameElse: 'MMMM D'
  });

  return upperCaseFirstLetter(calendar);
}