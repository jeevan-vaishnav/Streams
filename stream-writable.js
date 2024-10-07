const fs = require("node:fs/promises");
/**
 * CPU Usage: 100% ( Core One )
 * Memoery Usege:50mb
 * This solutions is good for developing faster and memory efficient code
 */

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  let i = 0;

  /**
   * Continuously writes Buffers to our Write Stream until we hit 1000000
   * If our stream's internal buffer is full, we stop writing until the "drain" event is emitted
   * Our last write is handled by calling stream.end() with the last Buffer
   */

  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if(i === 999999){ 
          return stream.end(buff)
        }
      //if the stream.write returns false, stop the loop
      if (!stream.write(buff)) break;
      i++;
    }
  };

  writeMany();

  //Wait for buff empty and executing call back
  stream.on("drain", () => {
    // resume oour loop once our stream's internal buffer is empited
    writeMany();
  });

  stream.on('finish',()=>{
    console.timeEnd("writeMany");
    fileHandle.close();
  })

})();
