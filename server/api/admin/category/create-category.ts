import prisma from "~/utils/script.prisma";
import { categorySchema } from "./modules/validate-category";



export default defineEventHandler(async (event) => {
  const { name} = await readBody(event);
  const result = categorySchema.safeParse({name });
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "validation failed",
      data: result.error.flatten(),
    });
  }
  const categoryExist = await prisma.category.findUnique({
    where: {
      name: name,
    },
  });
  if (categoryExist) {
    throw createError({
      statusCode: 400,
      message: "This category is already been taken ",
    });
  }
 
  const category = await prisma.category.create({
    data: {
      name:name,
    },
  });


  return {
    message: { message: "Category created successfully", category},
  };
});
