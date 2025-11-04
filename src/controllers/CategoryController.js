const prisma = require("../db/PrismaClient");
const AppError = require("../utils/AppError");
const {z} = require("zod");



class CategoryController {

    async create(req, res){
        const bodySchema = z.object({
            name: z.string().trim().max(100, {error: "The name must contain a maximum of 100 characters."}),
            description: z?.string().max(255, {error: "The description should contain a maximum of 255 characters."})
        });

        const {name, description} = bodySchema.parse(req.body);

        const categoryAlreadyExists = await prisma.categoria.findFirst({
            where: { name }
        });

        if(categoryAlreadyExists !== null) 
            throw new AppError("Category already exists.")

        const category = await prisma.categoria.create({
            name,
            description
        })

        return res.status(200).json(category);

    }


}