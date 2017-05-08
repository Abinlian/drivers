exports = module.exports = {
  isIntString,
  isFloatString,
  isBooleanString,
  isNotEmptyString
}

function isIntString(...datas) {
  for (let data of datas) {
    if (!(typeof data === 'string' && !isNaN(parseInt(data)) && parseInt(data) == parseFloat(data))) {
      return false;
    }
  }
  return true;
}

function isFloatString(...datas) {
  for (let data of datas) {
    if (!(typeof data === 'string' && !isNaN(parseFloat(data)))) {
      return false;
    }
  }
  return true;
}

function isBooleanString(...datas) {
  for (let data of datas) {
    if (!(typeof data === 'string' && (data == 'true' || data == 'false'))) {
      return false;
    }
  }
  return true;
}

function isNotEmptyString(...datas) {
  for (let data of datas) {
    if (!(typeof data === 'string' && data != '')) {
      return false;
    }
  }
  return true;
}

function isEnumString(data, ...values) {
  if (typeof data !== 'string') return false;

  for (let value of values) {
    if (data == value) return true;
  }
  return false;
}
