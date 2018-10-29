navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {

    const signalhub = require('signalhub');
    const createSwarm = require('webrtc-swarm');
    const hub = signalhub('video-chat', [
        // list of signalling servers
        'http://localhost:8080'
    ]);
    const swarm = createSwarm(hub, {
        stream: stream // gives the stream to the swarm, to give to all the peers.
    });

    const User = require('./user.js');
    const you = new User();
    you.addStream(stream);

    const users = {};
    swarm.on('connect', (peer, id) => {
        if (!users[id]) { // if new user, create them
            users[id] = new User();
            peer.on('data', (data) => {
                data = JSON.parse(data.toString()); // Parse other player's data, comes in buffer.
                users[id].update(data);
            })
            // add the new user's stream to your window
            users[id].addStream(peer.stream)
            console.log(`user ${id} connected`)
        }
    })

    // cleanup.
    swarm.on('disconnect', (peer, id) => {
        if (users[id]) {
            console.log(`user ${users[id]} disconnected`)
            users[id].element.parentNode.removeChild(users[id].element);
            delete(users[id]);
        }
    })

    // setInterval(()=> {
    //     you.update();
    //     const youString = JSON.stringify(you);
    //     swarm.peers.forEach((peer)=> {
    //         peer.send(youString)
    //     })
    // }, 100);

})