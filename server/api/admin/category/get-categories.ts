import prisma from "~/utils/script.prisma";
export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany();

  return {
    data: {
      categories
    },
  };
});
