const prisma = require("../db/PrismaClient");
const AppError = require("../utils/AppError");
const {z} = require("zod");



class CategoryController {

    async create(req, res){
        const bodySchema = z.object({
            name: z.string().trim().max(100, {error: "O nome deve conter no máximo 100 caracteres."}),
            description: z?.string().max(255, {error: "A descrição deve conter no máximo 255 caracteres."})
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