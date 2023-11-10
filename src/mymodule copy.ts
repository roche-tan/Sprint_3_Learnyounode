import * as fs from "fs";
import * as path from "path";

const myModule = (
  directory: string,
  extension: string,
  callback: (error: Error | null, list: string[]) => void
): void => {
  try {
    fs.readdir(directory, (error, files) => {
      if (error) {
        return callback(error, []);
      }
      const filteredFiles = files.filter(
        (file: string) => path.extname(file) === "." + extension
      );
      callback(null, filteredFiles);
    });
  } catch (error: any) {
    callback(error, []);
  }
};

module.exports = myModule;
