const handleHello = (req, res) => {
    const name = "HaiNoEx";
    return res.render("home.ejs", {name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

module.exports = {
    handleHello,
    handleUserPage
}