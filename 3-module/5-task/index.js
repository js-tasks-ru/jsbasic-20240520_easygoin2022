function getMinMax(str) {
  let arr = str.split(' ').map(elem => Number(elem)).filter(elem => !isNaN(elem));

    let min = Math.min(...arr);
    let max = Math.max(...arr);

    let result = {
        min: min,
        max: max
    }

    return result;
}



