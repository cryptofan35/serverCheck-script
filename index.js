let async = require("async");
let axios = require("axios");
let shell = require("shelljs");
const { performance } = require("perf_hooks");

async.forever(function (StartSync) {
  setTimeout(async () => {
    try {
      const t0 = performance.now();
      await axios.get("https://api.velascan.org/health");
      const t1 = performance.now();
      console.log(t1 - t0, "time difference");
      const difference = t1 - t0;
      if (difference > 2000) {
        console.log("๐ here is server errorโโโ");
        shell.exec("systemctl restart api.velascan.service");
      }
    } catch (err) {
      console.log("๐ here is catch errorโโโ");
      shell.exec("systemctl restart api.velascan.service");
    }
    StartSync();
  }, 5000);
});
