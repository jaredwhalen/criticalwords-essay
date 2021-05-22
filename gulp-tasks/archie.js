const Gootenberg = require('gootenberg');
const fs = require("fs");

const credentials = require('../credentials.json');
const token = require('../token.json');

module.exports = function(gulp, plugins) {
  return async function archie() {
    const goot = new Gootenberg();
    await goot.auth.oauth(credentials, token);
    //console.log(data);
    const meta = require('../app/data/meta.json');
    const archie_json = await goot.parse.archie('1ldxDwMruSX7ju3W6n12zy0Da6InVfpVk9YjEpHtIb6g');
    // Store in a JSON file
    const parseLinks = (json, key) => {
      json.map( t => {
        var objectRegExp = /\[([^)]+)\)/g;
        var stringRegExp = /\[([^)]+)\]/g;
        var urlRegExp = /\(([^)]+)\)/g;

        var matches = objectRegExp.exec(t[key]);

        console.log(matches)

        if (matches) {
          matches.map(match => {
            let string = stringRegExp.exec(match)
            let url = urlRegExp.exec(match)
            if (string && url) {
              let replacement = `<a target="_blank" href="${url[1]}">${string[1]}</a>`
              console.log(replacement)
              t[key] = t[key].replace(match, replacement)
            }
          })
        }

      })
    }

    // parseLinks(archie_json.slides, "text")
    // console.log(archie_json)

    fs.writeFile('./app/data/archie.json', JSON.stringify(archie_json), function(err) {
      if (err) {
        console.log('Unable to write to file');
      }
    });
  }
};
