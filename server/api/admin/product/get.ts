import prisma from "~/utils/script.prisma";
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query?.search as string;
  const products = await prisma.product.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      images: true,
    },
  });



  return {
    data: {
      products,
    },
  };
});
