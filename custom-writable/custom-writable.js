const { Writable, Readable, Transform, Duplex } = require("node:stream");
const fs = require("fs");
class FileWritableStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
    this.numberOfWrites = 0;
  }

  //This will run after the constructor, and it will put off all calling the other 
  //methods until we call the callback function 
  _construct(callback) {
    console.log("Construct");
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        //so if we have call the callback with an argument, it means that we have an error
        //and we should not proceed 
        console.log("err");
        callback(err);
      } else {
        console.log('no err! file opened' )
        this.fd = fd;
        //no argument means it was successful
        callback();  
    }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;
    // do our write operation..
    console.log('chunk size',this.chunkSize)
    console.log('writable high watermark',this.writableHighWaterMark)
    if(this.chunkSize > this.writableHighWaterMark){
      fs.write(this.fd,Buffer.concat(this.chunks),0,this.chunkSize,(err)=>{
        if(err){
          return callback(err);
        }
        this.chunks = [];
        this.chunkSize = 0;
        ++this.numberOfWrites;
        callback();
      })
    }else{
    //when we're done, we should call the callback function
      callback();
    }
    console.log("Write", this.numberOfWrites);
  }

  _final(callback) {
    console.log("Final");
    fs.write(this.fd,Buffer.concat(this.chunks),(err)=>{
      if(err){
        return callback(err)
      }
      this.chunks = [];
      callback();
    })
    callback();
  }

  _destroy(error, callback) {
    console.log("Number of writes", this.numberOfWrites);
    if(this.fd){
      fs.close(this.fd,(err)=>{
        callback(error | err)
      })
    }else{
      callback(error);
    }
  
    
  }
}

const stream = new FileWritableStream({ highWaterMark: 1800,fileName: "test.txt" });
stream.write(Buffer.from("This"));
stream.end(Buffer.from("Our"));

stream.on("drain", () => {
  console.log("Drained");
});

// 4.6.28