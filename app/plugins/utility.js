function pad(val, size) {
  let str = String(val);
  while (str.length < (size || 2)) {
    str = '0' + str;
  }

  return str;
}

function toDateInput(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
}

function toTimeInput(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${pad(hour, 2)}:${pad(minute, 2)}`;
}

function toDateTimeInput(date) {
  return `${toDateInput(date)}T${toTimeInput(date)}`;
}

function random(size) {
  return Math.floor(Math.random() * size);
}

function randomRange(a, b) {
  return a + random(b - a + 1);
}

function randomChoose(array) {
  return array[random(array.length)];
}

module.exports = {
  pad,
  toDateInput,
  toTimeInput,
  toDateTimeInput,
  random,
  randomRange,
  randomChoose,
};
