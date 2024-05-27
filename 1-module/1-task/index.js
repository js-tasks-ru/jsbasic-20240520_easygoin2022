function factorial(n) {

  let result;

  if(n > 1){
      let operand = n - 1;

      while(operand > 1){
        result = n * operand;
        n = result;
        operand--;
      }
  } else if(n >= 0) {
      result = 1;
  } else {
      console.error('You cannot calculate the factorial of a negative number');
  }
  return result;
}