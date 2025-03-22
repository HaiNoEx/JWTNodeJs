import bcrypt, { hash } from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from 'bluebird';
import db from '../models';


const salt = bcrypt.genSaltSync(10);



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword
        });
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
    

    // connection.query('select * from user',
    //     function(err, results, fields){
    //         if(err){
    //             console.log(err);
    //             return user;
    //         }

    //         user = results;
    //         return user;
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
            'select * from user'
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
            'delete from user where id = ?', [id]
        );
        
        return rows;  
    } catch (error) {
        console.log("Err: ",error)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute(
            'select * from user where id=?', [id]
        );
        
        return rows;  
    } catch (error) {
        console.log("Err: ",error)
    }
}

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    })
    try {
        const [rows, fields] = await connection.execute(
            'update user set email = ?, username = ? where id=?', [email,username,id]
        );
        
        return rows;  
    } catch (error) {
        console.log("Err: ",error)
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUser, 
    getUserById,
    updateUserInfo
}