import express from "express";

/**
 * 
 * @param {*} app - express app 
 */

//
const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs"); //ejs - thư viện - sử dụng ejs để viết html
    app.set("views", "./src/views"); // Nơi lưu trữ file

}



export default configViewEngine;