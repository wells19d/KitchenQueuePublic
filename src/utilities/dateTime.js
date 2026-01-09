//* dateTime.js
import moment from 'moment';

export const getToday = () => {
  return moment(new Date()).format();
};

export const rawDateTime = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format();
};

export const dateTimeStringDate = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('MMDDYYYY');
};

export const dateTimeStringTime = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('HHmmss');
};

export const dateTimeStringMDYT = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('MMDDYYYYYTHHmmss');
};

export const dateTimeDisplay = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('MM-DD-YYYY HH:mm:ss');
};

export const dateDisplay = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('MM-DD-YYYY');
};

export const timeDisplay = timestamp => {
  if (!timestamp || !timestamp.toDate) return null;
  return moment(timestamp.toDate().toISOString()).format('HH:mm:ss');
};
