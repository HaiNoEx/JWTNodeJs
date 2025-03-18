import mysql from "mysql2";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
})

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
    
    console.log(email);
    console.log(password);
    console.log(username);
    

    connection.query('INSERT INTO users(email, password, username) VALUES (?, ?, ?)', [email, password, username],
        function(err, results, fields){
            if(err){
                console.log(err);
            }
            console.log(results);
        }
    );


    return res.send("Han ")

}

module.exports = {
    handleHello,
    handleUserPage,
    handleCreateNewUser
}