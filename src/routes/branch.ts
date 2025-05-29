import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

import { errorHandler } from "../error-handler";
import { createBranch, deleteBranch, getBranchDetails, listBranches, updateBranch } from "../controllers/branch";

const branchRoutes:Router = Router()


branchRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createBranch))
branchRoutes.put("/edit/:branchId", [authMiddleware, adminMiddleware], errorHandler(updateBranch));
branchRoutes.delete("/delete/:branchId", [authMiddleware, adminMiddleware], errorHandler(deleteBranch));
branchRoutes.get('/', errorHandler(listBranches));
branchRoutes.get('/details/:branchId', [authMiddleware], errorHandler(getBranchDetails));

export default branchRoutes