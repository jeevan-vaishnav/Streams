const fs = require("node:fs/promises");

// DON"T DO IT THIS WAY SPECAIIFLY ON PRODUCTIONS
//Execution Time: 270ms
//CPU Usage:100% ( one core )
//Memoery Usage: 200mb

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  /**
   * 8bits = 1 byte
   * 1000 bytes = 1 kilobyte
   * 1000 kilobytes = 1 megabyte
   */

  const buff = Buffer.alloc(16383, 10);
  console.log(stream.write(buff));
  console.log(stream.write(Buffer.alloc(1,"a")));
  console.log(stream.write(Buffer.alloc(1,"a")));
  console.log(stream.write(Buffer.alloc(1,"a")));

  console.log(stream.writableLength)

  stream.on("drain",()=>{
    console.log(stream.write(Buffer.alloc(1,"a")))
    console.log(stream.writableLength);
    console.log('We are now safe to write more!')
  });
  
  // setInterval(()=>{},1000)

  // for (let i = 0; i < 1000000; i++) {
  //   const buffNew = Buffer.from(` ${i} `, "utf-8");
  //   stream.write(buffNew);
  // }
  console.timeEnd("writeMany");
  // fileHandle.close();
})();
