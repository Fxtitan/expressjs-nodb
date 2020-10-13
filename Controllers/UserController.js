const users = require('../models/usersArray')

module.exports = {
getAllUsers: (req, res) => {
    return res.status(200).json({ confirmation: 'success', users });
},

createNewUsers: (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
    return res
        .status(400)
        .json({ confirmation: 'fail', message: 'All Inputs Must Be filled' });
    }
    let existingUser = users.filter(
        (foundUser) => foundUser.email === req.body.email
    );
    if (existingUser.length) {
        return res.status(400).send('User Already Exists');
    }
    const newUser = {};
    newUser.name = req.body.name;
newUser.email = req.body.email;
newUser.password = req.body.password;
newUser.id = String(users.length + 1);
users.push(newUser);
return res.status(200).json({ confirmation: 'success', newUser });
},

findOne: (req, res) => {
    let foundUser = users.filter((user) => {
    if (user.id === req.params.id) {
        return res.status(200).json({ confirmation: 'success', user });
    }
});
if (!foundUser.length)
return res
.status(400)
.json({ confirmation: 'fail', message: 'User Does Not Exist' });
},

    updateUser: (req, res) => {
    let updatedUser = req.body;
    users.filter((foundUser) => {
    if (foundUser.id === req.params.id) {
        foundUser.name = updatedUser.name ? updatedUser.name : foundUser.name;
        foundUser.password = updatedUser.password
        ? updatedUser.password
        : foundUser.password;
    }
    });
    return res.status(200).json({ message: 'User Updates', users });
},

    deleteOne: (req, res) => {
        let removeUser = users.filter((foundUser) => {
    return foundUser.id !== req.params.id;
    });
    users = removeUser;
    return res.status(200).json({ confirmation: 'success', users });
}
};


//createNewUser
//findOneUser
//updateUser
//deleteUser