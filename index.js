let async = require("async");
let axios = require("axios");
let shell = require("shelljs");

async.forever(function (StartSync) {
  setTimeout(async () => {
    try {
      const t0 = performance.now();
      await axios.get("https://api.velascan.org/health");
      const t1 = performance.now();
      console.log(t1 - t0, "time difference");
      const difference = t1 - t0;
      if (difference > 2000) {
        console.log("😟 here is server error❗❗❗");
        shell.exec("systemctl restart api.velascan.service");
      }
    } catch (err) {
      console.log("😟 here is catch error❗❗❗");
      shell.exec("systemctl restart api.velascan.service");
    }
    StartSync();
  }, 1000);
});
