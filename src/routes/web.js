import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 * 
 * @param {*} app: express app 
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHello)

    router.get("/about", homeController.handleUserPage)
    return app.use("/", router) // Bắt đầu bằng trang chủ
}

export default initWebRoutes;