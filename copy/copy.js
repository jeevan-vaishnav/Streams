const fs = require('node:fs/promises');

/**
 * speed and space complexity
 * speed BIG 0 n^2
 * Memory Usage: 1 GB
 * 100% 
 * Execution time: 900ms
 */
// (async () =>{
//     const destFile = await fs.open('dest.txt', 'w')

//     const result = await fs.readFile('big-gigantic.txt');

//     console.log(result)
    
//     await destFile.write(result);
// })();