import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@leadin.com" },
    update: {},
    create: {
      email: "admin@leadin.com",
      name: "Admin",
      role: "ADMIN"
    }
  });

  await prisma.rateProduct.upsert({
    where: { id: "demo-rate-1" },
    update: {},
    create: {
      id: "demo-rate-1",
      lender: "Metro Bank",
      type: "fixed",
      termYears: 5,
      rateAPR: 4.29,
      fee: 999,
      ltvMax: 85
    }
  });

  await prisma.rateProduct.upsert({
    where: { id: "demo-rate-2" },
    update: {},
    create: {
      id: "demo-rate-2",
      lender: "Octane Capital",
      type: "bridging",
      termYears: 1,
      rateAPR: 7.1,
      fee: 0,
      ltvMax: 75
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
