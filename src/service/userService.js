import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2/promise";


import bluebird from 'bluebird';




const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute(
            'INSERT INTO users(email, password, username) VALUES (?, ?, ?)',
            [email, hashPassword, username]
        );
    } catch (error) {
        console.log(error);
    }

    
}

const getUserList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    

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

const deleteUser = async (id) =>  {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute(
            'delete from users where id = ?', [id]
        );
        
        return rows;  
    } catch (error) {
        console.log("Err: ",error)
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser
}