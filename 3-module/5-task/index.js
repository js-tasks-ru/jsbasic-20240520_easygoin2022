function getMinMax(str) {
  let arr = str.split(' ').map(elem => Number(elem)).filter(elem => !isNaN(elem));

    let min = Math.min(...arr);
    let max = Math.max(...arr);

    return {
        min: min,
        max: max
    }
}



