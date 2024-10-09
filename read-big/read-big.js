const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("big-gigantic.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");
  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = ''
  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString('utf-8').split("  "); // each chunk is converted to string and each character is 8bits

    if(Number(numbers[0]) !== Number(numbers[1]) - 1){
        if(split) numbers[0] = split.trim() + numbers[0].trim();
    }

    // console.log(Number(numbers[numbers.length - 2] + 1), Number(numbers[numbers.length - 1]));
    if(Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])){
      split = numbers.pop();
    }

    numbers.forEach((number)=>{
      let n = Number(number);
      if(n % 2 === 0){
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause();
        }
      }
    })

    
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });
})();
