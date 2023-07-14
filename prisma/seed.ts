import { prisma } from "@/utils/prisma";
import { hash } from "bcryptjs";

async function main() {
  const password = await hash(process.env.ADMIN_PASSWORD as string, 12);
  const email = process.env.ADMIN_EMAIL as string;
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
