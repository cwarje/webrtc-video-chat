module.exports = User

// pass an id later, and name.
// Creates a user with the specified attributes.
function User (data) {
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

// Generates a mock GUID, from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function generateGUID() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
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