const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("big-gigantic.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");
  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    if (!streamWrite.write(chunk)) {
      console.log("streamRead.Pause");
      streamRead.pause();
    }
  });

  streamWrite.on("drain", () => {
    console.log("Drained");
    streamRead.resume();
  });
})();
