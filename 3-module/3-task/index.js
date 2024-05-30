function camelize(str) {
  let newArr = str.split('-');

  return newArr
  .map(elem => newArr.indexOf(elem) == 0? elem : elem[0].toUpperCase() + elem.slice(1))
  .join('');
}
