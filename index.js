const controller = require('./app/controller')

var search = "dom casmurro"

controller.extractTorrents(search).then(data => {
        if (!data.urls.length) {
            console.log('No data found');
            return;
        }

        console.log('Results:\n')
        var i = 0;
        data.urls.forEach(item => {
            i++;
            console.log(item.name, item.uri)
            console.log('------------');
        });
        console.log("Total = ", i)
    }).catch(err => console.log(err))

    









