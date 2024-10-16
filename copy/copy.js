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

/** new and fast */

/**
 * speed and space complexity
 * speed BIG 0 n^2
 * FileSize: 1gb
 * Memory Usage: 30 mb
 * 100% 
 * Execution time: 2 s
 */

// (
//     async ()=>{
//         console.time("copy");
//         const srcFile  = await fs.open('text-big.txt' , 'r');
//         const desFile = await fs.open('text-copy.txt','w');

//         let bytesRead = -1;

//         while(bytesRead !== 0){
//             const readResult = await srcFile.read()
//             bytesRead = readResult.bytesRead;

//             if(bytesRead !== 16384){
//                 const indexOfNotFilled = readResult.buffer.indexOf(0);
//                 const newBuffer = Buffer.alloc(indexOfNotFilled);
//                 readResult.buffer.copy(newBuffer,0,0,indexOfNotFilled);
//                 desFile.write(newBuffer)

//             }else{
//                 desFile.write(readResult.buffer)
//                 console.log(readResult.buffer)
//             }

//         }
//         console.timeEnd('copy');
//     }
// )();


/**
 * This logic can apply in production
 * Using Stream for
 * FileSize:  
 * Memeory Usage: 
 * Execution Time: 
 */

(async()=>{
    console.time('copy');
    // print currnt time
    // console.log("Start Time: " + new Date())
    const srcFile = await fs.open('text-big.txt','r');
    const destFile = await fs.open('text-copy.txt','w');

    //create stream for read and write
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();
    
    console.log(readStream.readableFlowing)
    readStream.pipe(writeStream)
    console.log(readStream.readableFlowing)
    readStream.unpipe(writeStream);
    console.log(readStream.readableFlowing)
    readStream.pipe(writeStream);
    console.log(readStream.readableFlowing)

    //End function 
    readStream.on('end',()=>{
        // console.log("End Time: " + new Date())
        console.log('Reading end.')
    })

    console.timeEnd('copy');
})()