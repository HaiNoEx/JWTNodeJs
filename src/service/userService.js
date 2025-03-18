import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2";



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
})
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query('INSERT INTO users(email, password, username) VALUES (?, ?, ?)', [email, hashPassword, username],
        function(err, results, fields){
            if(err){
                console.log(err);
            }
            
        }
    );
}

const getUserList = () => {
    let users = [];

    connection.query('select * from users',
        function(err, results, fields){
            if(err){
                console.log(err);
            }
            console.log(results);
        }
    );
}

module.exports = {
    createNewUser,
    getUserList
}