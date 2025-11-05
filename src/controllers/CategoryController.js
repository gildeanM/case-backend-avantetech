const prisma = require("../db/PrismaClient");
const AppError = require("../utils/AppError");
const {z} = require("zod");

class CategoryController {

   

    async create(req, res){
        
        const bodySchema = z.object({
            name: z.string().trim().max(100, {error: "The name must contain a maximum of 100 characters."}),
            description: z?.string().max(255, {error: "The description should contain a maximum of 255 characters."}),
        
        });

        const {name, description} = bodySchema.parse(req.body);

        const categoryAlreadyExists = await prisma.categoria.findFirst({
            where: { name }
        });

        if(categoryAlreadyExists !== null) 
            throw new AppError("Category already exists.")

        const category = await prisma.categoria.create({
            data: {
                name,
                description
            }
        })

        return res.status(200).json(category);

    }

    async list(req, res){
        
        const categories = await prisma.categoria.findMany();
        
        return res.status(200).json(categories);
        
    }

    async delete(req, res){

        const categoryId = Number.parseInt(req.params.id);

        const categoryAlreadyDeleted = await prisma.categoria.findFirst({
            where: { id: categoryId }
        });

        if(categoryAlreadyDeleted === null)
            throw new AppError("Category not find.");

        const categoryDeleted = await prisma.categoria.delete({
            where: { id: categoryId } 
        });

        return res.status(200).json(categoryDeleted);

    }

    async update(req, res){

        const  bodySchema = z.object({
            name: z.string().trim().max(100, {error: "The name must contain a maximum of 100 characters."}),
            description: z?.string().max(255, {error: "The description should contain a maximum of 255 characters."}),        
        });

        const categoryId = Number.parseInt(req.params.id);

        const { name, description } = bodySchema.parse(req.body);

        const categoryAlreadyExists = await prisma.categoria.findFirst({
            where: { id: categoryId },
        });

        if(categoryAlreadyExists === null) 
            throw new AppError("Category not find.")

        const categoryUpdated = await prisma.categoria.update({
            where: { id: categoryId },
            data:{
                name,
                description
            }
        })

        return res.status(200).json(categoryUpdated);
    }
    
}

module.exports = new CategoryController();