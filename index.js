navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream) => {

    const signalhub = require('signalhub');
    const createSwarm = require('webrtc-swarm');

    // Configures the signaling server.
    const hub = signalhub('video-chat', [
        'http://localhost:8080'
    ]);

    // gives the stream to the swarm, to give to all the peers.
    const swarm = createSwarm(hub, {
        stream: stream 
    });

    const User = require('./user.js');
    const you = new User();

    setYourName();
    updatePeers();

    you.addStream(stream);
    const users = {};

    swarm.on('connect', function(peer,id) {
        if (!users[id]) { // if new user, create them
            users[id] = new User();
            console.log("this happens for the first peer too!")
            peer.on('data', (data) => {
                data = JSON.parse(data.toString()); // Parse other player's data, comes in buffer.
                users[id].update(data);
            })
            // add the new user's stream to your window
            users[id].addStream(peer.stream)
        }
        
        setYourName();
        updatePeers();
    })

    // Sets the users's name from their url.
    function setYourName() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        you.name = url.searchParams.get("name");
    }

    // Update peers with your data.
    function updatePeers() {
        you.update()
        const youString = JSON.stringify(you)
        swarm.peers.forEach(function (peer) {
            peer.send(youString)
        })
    }

    // Cleanup.
    swarm.on('disconnect', function (peer, id) {
        if (users[id]) {
            console.log(users[id]);
            users[id].element.parentNode.removeChild(users[id].nameElement);
            users[id].element.parentNode.removeChild(users[id].element);
            console.log(users[id]);
            delete(users[id]);
        }
    })
})