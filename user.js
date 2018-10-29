module.exports = User

// pass an id later, and name.
// Creates a user with the specified attributes.
function User (data) {
    console.log('user created');
    data = data || {}
    // this.id = data.id || generateGUID()
    this.name = data.name || 'Anonymous'
    this.element = document.createElement('video')
    Object.assign(this.element.style, {
        width: '64px',
        height: '64px',
        position: 'relative'
    })
    document.body.appendChild(this.element)
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