const { ZodError, z } = require("zod");
const AppError = require("../utils/AppError");
const { Prisma } = require("@prisma/client");
const e = require("express");



function errorHandling(err, req, res, next){

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    if(err instanceof ZodError){
        return res.status(400).json({
            message: "Validation error.", 
            issues: z.treeifyError(err)
        });
    }

    if(err instanceof Prisma.PrismaClientValidationError){
        return res.status(400).json({
            message: err.message
        });
    }

}