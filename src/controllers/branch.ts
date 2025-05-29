import { Branch } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { CreateBranchSchema, UpdateBranchSchema } from "../schema/branch";
import { prismaClient } from "../server";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";


export const createBranch = async (req: Request, res: Response) => {
  const validatedData = CreateBranchSchema.parse(req.body);

  const branch = await prismaClient.branch.create({
    data: {
      name: validatedData.name,
      phoneNumber: validatedData.phoneNumber,
      address: validatedData.address
      
    },
  });
  res.json(branch);
};

export const updateBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branchId = parseInt(req.params.branchId);
    const validatedData = UpdateBranchSchema.parse(req.body); // Allow partial updates

    if (isNaN(branchId)) {
      throw new BadRequestsException("Invalid branch ID", ErrorCode.INVALID_BRANCH_ID);
    }

    const branch = await prismaClient.branch.findUnique({ where: { id: branchId } });

    if (!branch) {
      throw new NotFoundException("Branch not found", ErrorCode.BRANCH_NOT_FOUND);
    }

    const updatedBranch = await prismaClient.branch.update({
      where: { id: branchId },
      data: {
        name: validatedData.name ?? branch.name,
        phoneNumber: validatedData.phoneNumber ?? branch.phoneNumber,
        address: validatedData.address ?? branch.address
        
      },
    });

    res.json({ message: "Branch updated successfully", updatedBranch });
  } catch (error) {
    next(error);
  }
};

export const deleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branchId = parseInt(req.params.branchId);

    if (isNaN(branchId)) {
      throw new BadRequestsException("Invalid branch ID", ErrorCode.INVALID_BRANCH_ID);
    }

    const branch = await prismaClient.branch.findUnique({ where: { id: branchId } });

    if (!branch) {
      throw new NotFoundException("Branch not found", ErrorCode.BRANCH_NOT_FOUND);
    }

    await prismaClient.branch.delete({ where: { id: branchId } });

    res.json({ message: "Branch deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const getBranchDetails = async (req: Request, res: Response) => {
  try {
    const branchId = parseInt(req.params.branchId);

    // Check if branchId is valid
    if (isNaN(branchId)) {
      throw new BadRequestsException(
        "Invalid branch ID",
        ErrorCode.INVALID_BRANCH_ID
      );
    }

    const branch = await prismaClient.branch.findUnique({
      where: { id: branchId },
     
    });

    if (!branch) {
      throw new NotFoundException(
        "Branch not found",
        ErrorCode.BRANCH_NOT_FOUND
      );
    }

    res.json(branch);
  } catch (error) {
    console.error("Error fetching branch details:", error);
    res.status(500).json({ error: error.message });
  }
};

export const listBranches = async (req: Request, res: Response) => {
  try {
    const branches = await prismaClient.branch.findMany({
     
    });

    res.json(branches);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve branches", error: error.message });
  }
};