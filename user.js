module.exports = User

// Creates a user with the specified attributes.
function User (data) {
    console.log('user created');
    data = data || {}
    this.name = 'Anonymous'

    var divider = document.createElement("div");
    var displayName = document.createTextNode(this.name);

    this.element = document.createElement('video')
    Object.assign(this.element.style, {
        width: '256px',
        height: '230px',
        position: 'relative'
    })

    divider.appendChild(displayName);
    divider.appendChild(this.element);

    document.getElementById('videos').appendChild(divider);
}

User.prototype.addStream = function (stream) {
    this.element.srcObject = stream;
    this.element.play();
}

// Allows for updating the user object.
User.prototype.update = function (data) {
    data = data || {}
    this.name = data.name || this.name
    
}