const controller = require('./app/controller')
process.stdin.setEncoding('utf8');

console.log('\x1b[32mDigite uma pesquisa:\x1b[0m ');
process.stdin.on('data', (data) => {
    const search = data.trim();

    controller.extractTorrents(search).then(data => {
        if (!data.urls.length) {
            console.log('\x1b[31mNo data found\x1b[0m');
            return;
        }

        console.log('Results:\n')
        var i = 0;
        const colors = ['\x1b[34m', '\x1b[33m', '\x1b[32m', '\x1b[31m', '\x1b[35m', '\x1b[33m', '\x1b[38;5;208m', '\x1b[38;5;39m', '\x1b[90m', '\x1b[38;5;205m', '\x1b[36m', '\x1b[38;5;124m']; // Array de códigos de cores ANSI

        data.urls.forEach(item => {
            i++;
            const randomIndex = Math.floor(Math.random() * colors.length);
            const color = colors[randomIndex];
            const colorCode = `\x1b[${color}m`;
            const resetCode = '\x1b[0m';

            console.log(`${colorCode}${item.name}${resetCode}`, `${colorCode}${item.uri}${resetCode}`);
            console.log('------------');
        });

        console.log("Total = ", i);
    }).catch(err => console.log(err));

    process.stdin.pause();
});
