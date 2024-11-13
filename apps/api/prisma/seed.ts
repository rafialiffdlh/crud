import prisma from '../src/prisma';
import { brands, products} from './seed.json';

const seedBrands = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < brands.length; i++) {
      await trx.brands.upsert({
        where: { id: brands[i].id },
        create: { name: brands[i].name },
        update: { name: brands[i].name },
      });
    }
  });
};

const seedProducts = async () => {
  await prisma.$transaction(async (trx) => {
    for (let i = 0; i < products.length; i++) {
      await trx.products.upsert({
        where: { id: products[i].id },
        create: {
          name: products[i].name,
          description: products[i].description,
          price: products[i].price,
          brand_Id: products[i].brand_id,
          createdAt: new Date(),
        },
        update: {
          name: products[i].name,
          description: products[i].description,
          price: products[i].price,
          brand_Id: products[i].brand_id,
          updatedAt: new Date(),
        },
      });
    }
  });
};

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const modelMapping = {
  brands: prisma.brands.aggregate({ _count: { id: true } }),
  products: prisma.products.aggregate({ _count: { id: true } }),
};

const isTableSeeded = async (
  modelName: keyof typeof modelMapping
): Promise<boolean> => {
  const model = modelMapping[modelName];
  const count = await model;
  return count._count.id > 0;
};

const main = async () => {
  console.log('Starting seeding...');

  if (!(await isTableSeeded('brands'))) {
    await seedBrands();
    console.log('Seeded Brands');
  } else {
    console.log('Brands table already seeded');
  }
  await delay();

  if (!(await isTableSeeded('products'))) {
    await seedProducts();
    console.log('Seeded Products');
  } else {
    console.log('Products table already seeded');
  }
  console.log('Seeding process completed.');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error occurred during seeding:');
    console.error(e);
    await prisma.$disconnect();
  });
