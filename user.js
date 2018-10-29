module.exports = User

// pass an id later, and name.
// Creates a user with the specified attributes.
function User (data) {
    data = data || {}
    this.color = data.color || randomColor()
    this.x = 0
    this.y = 0
    this.element = document.createElement('div')
    Object.assign(this.element.style, {
        width: '64px',
        height: '64px',
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgroundColor: this.color
    })
    document.body.appendChild(this.element)
}

// Allows for updating the user object.
User.prototype.update = (data) => {
    data = data || {}
    this.x = data.x || this.x
    this.y = data.y || this.y
    Object.assign(this.element.style, {
        top: `${this.y}px`,
        left: `${this.x}px`
    })
}