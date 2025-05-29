import { Router } from "express";
import authRoutes from "./auth";
import branchRoutes from "./branch";

const rootRouter:Router = Router()

rootRouter.use('/auth',authRoutes)
rootRouter.use('/branch', branchRoutes)

export default rootRouter;