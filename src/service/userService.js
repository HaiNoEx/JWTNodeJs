import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2/promise";


import bluebird from 'bluebird';




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

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    
    let users = [];

    // connection.query('select * from users',
    //     function(err, results, fields){
    //         if(err){
    //             console.log(err);
    //             return users;
    //         }

    //         users = results;
    //         return users;
    //     }
    // );

    /**
     * Khai báo kiểu destructuring assignment
     * [] mang nghĩa vế phải cũng sẽ trả về 1 mảng (có thể là {} để chỉ object)
     * lần lượt các biến bên trái sẽ nhận giá trị bên phải
     * vd: [a, b] = [1, 2]
     */

    try {
        const [rows, fields] = await connection.execute(
            'select * from users'
        );
        
        return rows;  
    } catch (error) {
        console.log("Err: ",error)
    }


}

module.exports = {
    createNewUser,
    getUserList
}