const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const props = await prisma.property.findMany({
    where: { name: { contains: 'Botanica' } }
  });
  console.log(JSON.stringify(props, null, 2));
}
main().finally(() => prisma.$disconnect());
