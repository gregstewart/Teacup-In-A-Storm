import isCI from 'is-ci';
import dotEnv from 'dotenv';
import jsonFile from 'jsonfile';
import main from '../src/index';

if (!isCI) {
  dotEnv.config();
}

const build = () => (
  main()
);

build()
  .then((data) => {
    jsonFile.writeFile('../ui/resources/public/json/data.json', data, (err) => {
      if (err) {
        throw (err);
      }
      console.log('file was written');
    });
  })
  .catch((error) => {
    console.error(error);
  });
