import prisma from "~/utils/script.prisma";
import { productSchema } from "./modules/validate-product";

export default defineEventHandler(async (event) => {
  const { name,color,categoryId,price } = await readBody(event);
  const result = productSchema.safeParse({ name,color,categoryId,price});
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "validation failed",
      data: result.error.flatten(),
    });
  }

  const product = await prisma.product.create({
    data: {
      name: name,
      color:color,
      price:price,
      categoryId:categoryId
    },
  });

  return {
    data: {
      product,
      message: "product created successfully",
    },
  };
});
