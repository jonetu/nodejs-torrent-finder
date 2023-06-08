<h1 align="center">Torrent Magnet-link Searchs🧲</h1>

<p align="center">Web-Scrapping for magnet links</p>
<b>This software do not contribute to piracy, it's only a bot to find P2P magnet links from web</b>

## Install dependences
#### run npm install
```bash
  $ npm install
```

## Usage
#### Make index.js contain
```javascript
const controller = require('./app/controller')

    var search = "dom casmurro"
    
    controller.extractTorrents(search).then(data => {
            if (!data.urls.length) {
                console.log('No data found 🥺');
                return;
            }
            data.urls.forEach(item => {
                i++;
                console.log(item.name, item.uri)
            });
        }).catch(err => console.log(err))
```

Modify search variable, example: Awesome Dom Casmurro book

```javascript
var search = "dom casmurro"
```

The output will be:
```bash
# Retrieving sources from source
# Extracting magnets links...
# name | magnet links found
```

The output with no data found
```
$ No data found 🥺
```
## Web view app
#### just run this another code
```bash
  $ node web.js
```
<p>This software is for educational purposes only.</p>
