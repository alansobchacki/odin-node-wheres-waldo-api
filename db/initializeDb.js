const { createTarget } = require('./queries');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const targets = [
  {
    name: 'Consuela',
    image: `${IMAGE_BASE_URL}/assets/consuela.jpg`,
    xCoords: 36.22,
    yCoords: 26.97,
  },
  {
    name: 'Roger',
    image: `${IMAGE_BASE_URL}/assets/roger.jpg`,
    xCoords: 62.84,
    yCoords: 36.91,
  },
  {
    name: 'Kratos',
    image: `${IMAGE_BASE_URL}/assets/kratos.jpg`,
    xCoords: 59.04,
    yCoords: 68.25,
  },
  {
    name: 'Wilbur',
    image: `${IMAGE_BASE_URL}/assets/wilbur.jpg`,
    xCoords: 83.72,
    yCoords: 95.72,
  },
  {
    name: 'Samus Aran',
    image: `${IMAGE_BASE_URL}/assets/samus.jpg`,
    xCoords: 63.51,
    yCoords: 86.74,
  },
];

async function initializeDb() {
  try {
    console.log('Clearing existing targets...');
    await prisma.target.deleteMany();

    console.log('Seeding initial targets...');
    for (const target of targets) {
      await createTarget(target.image, target.name, target.xCoords, target.yCoords);
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDb();
