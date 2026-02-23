const bcrypt = require('bcrypt');

class User {
    constructor (username, password, role, _id) {
        this._id = _id;
        this.username = username;
        this.password = bcrypt.hash(password, 10);
        this.role = role;
    };

    get() {
        return {
            _id: this._id,
            username: this.username,
            password: this.password,
            role: this.role
        };
    };
}

module.exports = User;