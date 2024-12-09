const { createTarget } = require('./queries');
const prisma = require('../prisma');

const targets = [
  {
    image: 'https://example.com/images/waldo.jpg',
    name: 'Waldo',
    xCoords: 200,
    yCoords: 150,
  },
  {
    name: 'Wizard',
    image: 'https://example.com/images/wizard.jpg',
    xCoords: 300,
    yCoords: 400,
  },
  {
    name: 'Odlaw',
    image: 'https://example.com/images/odlaw.jpg',
    xCoords: 500,
    yCoords: 250,
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
