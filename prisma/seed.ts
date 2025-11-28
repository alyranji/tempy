import { PrismaClient } from "generated/prisma";
import {prisma} from "../lib/db";
import bcrypt from "bcrypt";



async function main(): Promise<void> {
  console.log("Starting seed...");

  // Hash password
  const hashedPassword = await bcrypt.hash("securepassword", 10);

  // --- User ---
  const user = await prisma.users.upsert({
    where: { email: "ali.ranjbaran76@gmail.com" },
    update: {}, // اگر وجود داشت، هیچی تغییر نده
    create: {
      username: "ali.ranjbaran",
      password: hashedPassword,
      email: "ali.ranjbaran76@gmail.com",
      status: "active",
      
    },
  });

  // --- Template ---
  const template = await prisma.templates.upsert({
    where: { slug: "my-first-template" },
    update: {},
    create: {
      description: "This is my first template",
      rtl: false,
      image:"/pixpa_02.png",
      sellCount:2000,
      demo_url: "https://example.com/demo",
      title: "My First Template",
      slug: "my-first-template",
      status: "active",
      price: 3000000,
      tags:["react", "ui", "template"],
      categories:["news"],
      features:["User-friendly"],
      addons:["support"],
      requirements:["Php8"],
      score:2,
    },
  });

  console.log("Seed data inserted successfully:", { user, template });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });