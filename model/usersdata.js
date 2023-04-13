const users = require("./users.mongo")

const newUser = async(data) =>{
    const user = await users.create(data);
    return user;
}

const loginUser = async(data) =>{
    const user = await users.find({
        email:data.email,
        password:data.password
    })
    return user;
}

module.exports = {
    newUser,
    loginUser,
}