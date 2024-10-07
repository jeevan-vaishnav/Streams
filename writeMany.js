const fs = require("node:fs/promises");

//Execution Time: 8s,
//CPU Usage: uses 100% of the cpu ( one core )
//Memory Usage: 50 megabytes
(async () => {
  console.time("writeMany");
  const fileHandling = await fs.open("test.txt", "w");
  for (let i = 0; i < 100000; i++) {
    await fileHandling.write(` ${i} `);
  }
  console.timeEnd("writeMany");
})();
