const signalhub = require('signalhub');
const hub = signalhub('video-chat', [
    // list of signalling servers
    'http://localhost:8080'
]);

hub.subscribe('update').on('data', (data) => {
    console.log(data);
})

setInterval(()=> {
    hub.broadcast('update', window.location.hash)
}, 1000);