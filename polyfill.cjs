const fs = require("fs");

fs.readFile('./polyfilla.cjs', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // data 是二进制类型，需要转换成字符串
    console.log("polyfill js")
    fs.writeFile('node_modules/makeit-captcha/es/captcha/modal.js', data.toString(), (err,data) => {
      if(err) {
        console.error(err);
      }
    })

})