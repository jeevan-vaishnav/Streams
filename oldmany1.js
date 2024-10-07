const fs = require("node:fs/promises");


// DON"T DO IT THIS WAY SPECAIIFLY ON PRODUCTIONS
//Execution Time: 270ms
//CPU Usage:100% ( one core )
//Memoery Usage: 200mb


(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();
  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8')
    stream.write(buff);
  }
  console.timeEnd("writeMany");

})();
