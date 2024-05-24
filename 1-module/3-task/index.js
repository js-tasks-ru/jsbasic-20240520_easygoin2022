function ucFirst(str) {
  if(typeof str === 'string'){
    if(str.length > 0){
      return str[0].toUpperCase() + str.slice(1);
    } else {
      return '';
    }
  } else {
    console.error('Not a string');
  }
}
