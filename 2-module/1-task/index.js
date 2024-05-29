function sumSalary(salaries) {
  let sum = 0;

  for(key in salaries){
      if(typeof salaries[key] === 'number'){
          if(salaries[key] >= 0){
              if(salaries[key] !== Infinity){
                  sum = sum + salaries[key];
              }
          }
      }
  }
  return sum;
}
