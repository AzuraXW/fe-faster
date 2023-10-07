import download from "download-git-repo";
import util from "node:util";

download[util.promisify.custom] = (repository, destination, options) => new Promise(
  (resolve, reject) => {
    download(repository, destination, options, (err) => {
      if (err) {
        reject(err);
      }
      resolve("download ok!");
    });
  },
);

export default util.promisify(download);
