const seedExtract = require('./seed_extract');
const magnetExtract = require('./magnet_extract');

function extractSeeds(data) {
  return seedExtract.extractSeeds(data);
}

function extractMagnet(query) {
  return magnetExtract.extractMagnet(query);
}

async function extractTorrents(data) {
  try {
    const seeds = await extractSeeds(data);
    const magnets = await extractMagnet(seeds);
    return magnets;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  extractTorrents
};
