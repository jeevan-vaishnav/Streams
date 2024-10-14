const fs = require('node:fs/promises');

(async () =>{
    const destFile = await fs.open('dest.txt', 'w')

    const result = await fs.readFile('big-gigantic.txt');

    console.log(result)
    
    await destFile.write(result);
})();