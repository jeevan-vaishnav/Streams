// const fs = require("node:fs/promises");

//Execution Time: 8s,
//CPU Usage: uses 100% of the cpu ( one core )
//Memory Usage: 50 megabytes
// (async () => {
//   console.time("writeMany");
//   const fileHandling = await fs.open("test.txt", "w");
//   for (let i = 0; i < 100000; i++) {
//     await fileHandling.write(` ${i} `);
//   }
//   console.timeEnd("writeMany");
// })();

// Callback version
/**
 * Execution Time : 2s
 * CPU Usage : uses 100% of the cpu
 * Memory Usage : 50 megabytes
 */
// const fs = require("node:fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(` ${i} `, "utf-8");
//       fs.writeSync(fd, buff);
//     }
//     console.timeEnd("writeMany");
//   });
// })();
