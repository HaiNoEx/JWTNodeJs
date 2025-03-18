import userService from '../service/userService';

const handleHello = (req, res) => {
    const name = "HaiNoEx";
    return res.render("home.ejs", {name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    //userService.createNewUser(email, password, username);
    userService.getUserList();
    return res.send("Han ")

}

module.exports = {
    handleHello,
    handleUserPage,
    handleCreateNewUser
}