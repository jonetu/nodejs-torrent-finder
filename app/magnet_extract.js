const request = require('request');
const cheerio = require('cheerio');
const urlParser = require('url');
const validUrl = require('valid-url');

const options = {
  url: '',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
  },
  timeout: 6000
};

function extractMagnet(urls) {
  console.log('Extracting magnet links...');

  function getMagnetLinks(url) {
    options.url = url;

    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
        if (err) {
          resolve([]);
          return;
        }

        const $ = cheerio.load(body);
        const links = [];

        $('a[href^="magnet:"]').each((i, elem) => {
          const link = elem.attribs.href;

          if (isValidMagnetLink(link)) {
            links.push(link);
          }
        });

        resolve(links);
      });
    });
  }

  function validUrls(item) {
    return validUrl.isUri(item);
  }

  const mountPromises = urls
    .filter(validUrls)
    .map(url => getMagnetLinks(url));

  return new Promise((resolve, reject) => {
    Promise.all(mountPromises)
      .then(data => {
        const urls = data.length ? getMagnetDto(data.reduce((acc, curr) => [...acc, ...curr], [])) : [];

        resolve({ urls });
      })
      .catch(reject);
  });
}

function getMagnetDto(googleMagnetRes) {
  return googleMagnetRes.map(link => ({
    uri: link,
    name: extractTorrentNameFromLink(link)
  }));
}

function extractTorrentNameFromLink(link) {
  let name = new urlParser.URL(link).searchParams.get('dn');

  if (!name) {
    const dnF = link.substring(link.indexOf('dn='));

    name = decodeURI(dnF.substring(3, dnF.indexOf('&amp')));
  }

  return name;
}

function isValidMagnetLink(link) {
  return link.startsWith('magnet:');
}

module.exports = {
  extractMagnet
};
