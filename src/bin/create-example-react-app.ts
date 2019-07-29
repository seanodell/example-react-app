#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';

const [, , argPath,] = process.argv;

class ApplicationError {
  constructor(public message: string) {
  }
}

async function app() {
  if (argPath == null || argPath.trim() == "")
    throw new ApplicationError("No application name provided");

  let targetPath = path.resolve(argPath);
  let sourcePath = path.resolve(`${__dirname}/..`);

  function copy(name: string) {
    let stat = fs.statSync(`${sourcePath}/${name}`);

    fs.copySync(`${sourcePath}/${name}`, `${targetPath}/${name}`);
  }

  if (!fs.existsSync(targetPath))
    fs.mkdirSync(targetPath);
  else
    throw new ApplicationError(`${argPath} already exists; halting!`);

  copy("package.json");
  copy("tsconfig.json");
  copy("webpack-tsconfig.json");
  copy("webpack.config.ts");
  copy(".babelrc");
  copy(".gitignore");

  copy("src");
  fs.remove(`${targetPath}/src/bin`);

  let appName = targetPath.match(/[^/]+$/);
  let packageJson = JSON.parse(fs.readFileSync(`${targetPath}/package.json`, "utf8"));
  packageJson.name = appName != null ? appName[0] : 'unknown';
  packageJson.description = packageJson.name;
  packageJson.version = '0.0.1';
  packageJson.license = '';
  packageJson.scripts.start = packageJson.scripts['start-web'];
  packageJson.scripts.build = packageJson.scripts['build-web'];
  delete packageJson.bin;
  delete packageJson.scripts['start-web'];
  delete packageJson.scripts['build-web'];
  delete packageJson.scripts['build-creator'];
  delete packageJson.scripts['test-creator'];
  fs.writeFileSync(`${targetPath}/package.json`, JSON.stringify(packageJson, null, 2));

  console.info(`Application created in ${targetPath}.\n\nDon't forget to run 'npm install'!`);
}

(async () => {
  await app();
})()
  .catch((error) => {
    if (error instanceof ApplicationError)
      console.error(`Error: ${error.message}`);
    else
      console.trace(error);
  });
