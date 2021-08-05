import moment from "moment";

export function formatDate(date: string) {
  const calendar = moment(date).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: '[last] ddd',
    sameElse: 'MMMM DD'
  });

  // capitalize first letter
  return calendar.charAt(0).toUpperCase() + calendar.slice(1);
}