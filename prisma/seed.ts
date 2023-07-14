import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const email = process.env.NEXT_PUBLIC_ADMIN_MAIL as string;
  const password = await hash(
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string,
    12
  );
  const admin = await prisma.user.upsert({
    where: { user_email: email },
    update: {},
    create: {
      user_email: email,
      user_password: password,
      user_role: "ADMIN",
      user_first_name: "Vincent",
      user_last_name: "Parrot",
      user_status: "ACTIVE",
    },
  });
  console.log(admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
