
export function swapArrayItems(arr, x, y){
  let b = arr[x];
  arr[x] = arr[y];
  arr[y] = b;
  return arr;
}

//let swap = usedStats.splice(id, 1, e)[0]
//console.log('usedStats', usedStats)
//hiddenStats.splice(id2, 1, swap)
//console.log('hiddenStats', hiddenStats)
