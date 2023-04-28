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

const userImage = async(url,id) =>{
    const user = await users.updateOne({
        _id:id
    },{
        imgurl:url
    })
    return user;
}

const addScore = async (score,id) =>{
    const user = await users.updateOne({
        _id:id
    },{
        $inc:{
            score:score
        }
    })
    return user
}

const collectReward = async (id,bool) =>{
    const user = await users.updateOne({
        _id:id
    },{
        rewardCollected:bool
    })
}
module.exports = {
    newUser,
    loginUser,
    userImage,
    addScore,
    collectReward,
}