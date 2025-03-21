import userService from '../service/userService';

const handleHello = (req, res) => {
    const name = "HaiNoEx";
    return res.render("home.ejs", {name});
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    console.log(">>> Check user list: ", userList);
    return res.render("user.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //userService.createNewUser(email, password, username);
    return res.send("Han ")

}

module.exports = {
    handleHello,
    handleUserPage,
    handleCreateNewUser
}