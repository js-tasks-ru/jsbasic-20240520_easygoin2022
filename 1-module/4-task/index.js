function checkSpam(str) {
  let newStr = str.toLowerCase();

  if(newStr.includes('1xbet') || newStr.includes('xxx')){
    return true;
  } else {
    return false;
  }
}
