import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Categories
  const categories = [
    'Gaming',
    'Lifestyle',
    'Fashion',
    'Beauty',
    'Food',
    'Travel',
    'Technology',
    'Sports',
    'Entertainment',
    'Education',
    'Health & Fitness',
    'Business',
  ];

  for (const categoryName of categories) {
    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
  }

  console.log(`✓ Created ${categories.length} categories`);

  // Seed Saudi Regions
  const regions = [
    'Riyadh',
    'Jeddah',
    'Makkah',
    'Madinah',
    'Dammam',
    'Khobar',
    'Dhahran',
    'Taif',
    'Tabuk',
    'Buraidah',
    'Khamis Mushait',
    'Hail',
    'Najran',
    'Jubail',
    'Abha',
    'Yanbu',
    'Al-Ahsa',
    'Qatif',
    'Jizan',
    'Al-Kharj',
  ];

  for (const regionName of regions) {
    await prisma.region.upsert({
      where: { name: regionName },
      update: {},
      create: { name: regionName },
    });
  }

  console.log(`✓ Created ${regions.length} regions`);

  console.log('✓ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
