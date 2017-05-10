import fs from 'fs';
import path from 'path'
import cheerio from 'cheerio';

// html file we are working on
const htmlPath = path.join(__dirname, '../ui/resources/public/index.html');
// html file to output modified html to
const outPath = path.join(__dirname, '../ui/resources/public/index.html');

// load in the json file with the replace values
import jsonResponse from '../ui/resources/public/json/data.json';

fs.readFile(htmlPath, {encoding: 'utf8'}, (error, data) => {
    if(error) {
      console.log(error);
    }

    const $ = cheerio.load(data); // load in the HTML into cheerio

    $('#data').attr( "data-json", JSON.stringify(jsonResponse) );
    fs.writeFile(outPath, $.html());
});
