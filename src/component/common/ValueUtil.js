const notEmptyArray = function (o) {
  return Array.isArray(o) && o.length > 0;
};
const isLng = function (value) {
  return isFinite(value) && value > -180 && value < 180;
};
const isLat = function (value) {
  return isFinite(value) && value > -90 && value < 90;
};
const getNumber = function (value, defaultValue) {
  if (isFinite(value)) return value;
  return defaultValue;
};
const getNotEmpty = function (value, defaultValue) {
  if (value) return value;
  return defaultValue;
};
export {
  notEmptyArray,
  isLng, isLat,
  getNumber,
  getNotEmpty
};
