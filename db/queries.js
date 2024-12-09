const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new target for players to find, must be initialized on a database
async function createTarget(image, name, x, y) {
  return await prisma.target.create({
    data: {
      image,
      name,
      xCoords: x,
      yCoords: y
    }
  });
}

// Gets x random targets, preferably 3
// Prisma does not have a 'random' method so a raw SQL query is needed here
async function getRandomTargets(limit) {
  return await prisma.$queryRaw`SELECT * FROM "Target" ORDER BY RANDOM() LIMIT ${limit}`;
}

// Check if the player's guess is correct (name + coordinates)
async function isGuessCorrect(name, x, y) {
  const target = await prisma.target.findFirst({
    where: {
      image: name,
      xCoords: x,    
      yCoords: y   
    }
  });

  return target !== null;
}

// Create a new player (will only be called after someone wins a game)
async function createPlayer(name) {
  return await prisma.player.create({
    data: {
      name,
      score
    },
  });
}

// Get the top 5 players for the highscore board
async function getAllPlayers() {
  return await prisma.player.findMany({
    orderBy: { score: 'asc' },
    take: 5,
  });
}

module.exports = {
  createTarget,
  getRandomTargets,
  isGuessCorrect,
  createPlayer,
  getAllPlayers
};
