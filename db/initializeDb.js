const { createTarget, createPlayer } = require('./queries');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const targets = [
  {
    name: 'Consuela',
    image: `${IMAGE_BASE_URL}/assets/consuela.jpg`,
    xCoords: 36,
    yCoords: 27,
  },
  {
    name: 'Roger',
    image: `${IMAGE_BASE_URL}/assets/roger.jpg`,
    xCoords: 63,
    yCoords: 37,
  },
  {
    name: 'Kratos',
    image: `${IMAGE_BASE_URL}/assets/kratos.jpg`,
    xCoords: 59,
    yCoords: 68,
  },
  {
    name: 'Wilbur',
    image: `${IMAGE_BASE_URL}/assets/wilbur.jpg`,
    xCoords: 84,
    yCoords: 96,
  },
  {
    name: 'Samus Aran',
    image: `${IMAGE_BASE_URL}/assets/samus.jpg`,
    xCoords: 64,
    yCoords: 87,
  },
  {
    name: 'Brian',
    image: `${IMAGE_BASE_URL}/assets/brian.jpg`,
    xCoords: 14,
    yCoords: 34,
  },
  {
    name: 'Kenshiro',
    image: `${IMAGE_BASE_URL}/assets/kenshiro.jpg`,
    xCoords: 20,
    yCoords: 53,
  },
  {
    name: 'Link',
    image: `${IMAGE_BASE_URL}/assets/link.jpg`,
    xCoords: 22,
    yCoords: 88,
  },
  {
    name: 'Phineas',
    image: `${IMAGE_BASE_URL}/assets/phineas.jpg`,
    xCoords: 97,
    yCoords: 48,
  },
  {
    name: 'Viper',
    image: `${IMAGE_BASE_URL}/assets/viper.jpg`,
    xCoords: 83,
    yCoords: 1,
  },
  {
    name: 'Predator',
    image: `${IMAGE_BASE_URL}/assets/predator.jpg`,
    xCoords: 94,
    yCoords: 23,
  },
  {
    name: 'Spider Man',
    image: `${IMAGE_BASE_URL}/assets/spiderman.jpg`,
    xCoords: 64,
    yCoords: 83,
  },
];

const playerNames = [
  "JCDent", "X", "asddas", "Agent3", "Eva"
];

async function initializeDb() {
  try {
    console.log('Clearing existing targets...');
    await prisma.target.deleteMany();

    console.log('Clearing existing players...');
    await prisma.player.deleteMany();

    console.log('Clearing complete. Creating data...');
    console.log('Seeding initial targets...');

    for (const target of targets) {
      await createTarget(target.image, target.name, target.xCoords, target.yCoords);
    }

    console.log('Creating 5 initial players...');
    const players = playerNames.map((name) => ({
      name: name,
      score: Math.floor(Math.random() * (200 - 30 + 1)) + 30, // Random score between 30 and 200
    }));

    for (const player of players) {
      await createPlayer(player.name, player.score);
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDb();
