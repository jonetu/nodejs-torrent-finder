const controller = require('./app/controller')
process.stdin.setEncoding('utf8');

console.log('\x1b[32mDigite uma pesquisa:\x1b[0m ');
process.stdin.on('data', (data) => {
    const search = data.trim();

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

    process.stdin.pause();
});
