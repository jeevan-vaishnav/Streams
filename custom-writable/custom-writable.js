const { Writable, Readable, Transform, Duplex } = require("node:stream");
const fs = require("fs");
class FileWritableStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    console.log("Construct");
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        console.log("err");
        callback(err);
      } else {
        console.log('no err')
        this.fd = fd;
        callback();  
    }
    });
  }

  _write(chunk, encoding, callback) {
    // do our write operation..
    console.log(chunk.toString());
    //when we're done, we should call the callback function
    callback();
  }

  _final(callback) {
    console.log("Final");
    callback();
  }

  _destroy(error, callback) {
    console.log("Destroy");
    callback();
  }
}

const stream = new FileWritableStream({ highWaterMark: 1800,fileName: "test.txt" });
stream.write(Buffer.from("This is some string"));
stream.end(Buffer.from("Our last write"));

stream.on("drain", () => {
  console.log("Drained");
});

// 4.6.28