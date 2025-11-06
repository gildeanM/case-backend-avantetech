const prisma = require("../db/PrismaClient");
const AppError = require("../utils/AppError");
const {z} = require("zod");

class ProductController {

    async create(req, res){
        
        const bodySchema = z.object({
            name: z
                .string()
                .trim()
                .min(1, {error:"Name is required."})
                .max(100, {error:"The name must contain a maximum of 100 characters."}),
            description: z
                .string()
                .max(500, {error:"The description should contain a maximum of 500 characters."})
                .optional(),
            price: z
                .coerce
                .number({
                    error: "The price has to be a number"
                })
                .positive({error: "The price has to grather than 0."}),
            categoryId: z.coerce.number().int().positive()
        
        });

        const {name, description, price, categoryId} = bodySchema.parse(req.body);

        const productAlreadyExists = await prisma.produto.findFirst({ where: { name } });
        const categoryExists = await prisma.categoria.findFirst({ where: { id: categoryId } });

        if(productAlreadyExists !== null) 
            throw new AppError("Product already exists.");

        if(categoryExists === null) 
            throw new AppError("Category doesn't exists.");

        const product = await prisma.produto.create({
            data: {
                name,
                description,
                price,
                categoryId
            }
        });

        return res.status(200).json(product);

    }

    async list(req, res){
        
        const products = await prisma.produto.findMany();
        
        return res.status(200).json(products);
        
    }

    async delete(req, res){

        const productId = z.coerce.number().int().positive().parse(req.params.id);

        const productAlreadyDeleted = await prisma.produto.findFirst({
            where: { id: productId }
        });

        if(productAlreadyDeleted === null)
            throw new AppError("Product not found.");

        const productDeleted = await prisma.produto.delete({
            where: { id: productId } 
        });

        return res.status(200).json(productDeleted);

    }

    async update(req, res){

        const bodySchema = z.object({
            name: z
                .string()
                .trim()
                .min(1, {error:"Name is required."})
                .max(100, {error:"The name must contain a maximum of 100 characters."}),
            description: z
                .string()
                .max(500, {error:"The description should contain a maximum of 500 characters."})
                .optional(),
            price: z
                .coerce
                .number({
                    error: "The price has to be a number"
                })
                .positive({error: "The price has to be grather than 0."}),
            categoryId: z.coerce.number().int().positive()
        
        });

        const productId = z.coerce.number().int().positive().parse(req.params.id);

        const { name, description, price, categoryId } = bodySchema.parse(req.body);

        const productAlreadyExists = await prisma.produto.findFirst({ where: { id: productId }});
        const categoryExists = await prisma.categoria.findFirst({ where: { id: categoryId } });

        if(productAlreadyExists === null) 
            throw new AppError("Product not found.")

        if(categoryExists === null) 
            throw new AppError("Category not found.")

        const productUpdated = await prisma.produto.update({
            where: { id: productId },
            data:{
                name,
                description, 
                price,
                categoryId
            }
        })

        return res.status(200).json(productUpdated);
    }
    
}

module.exports = new ProductController();