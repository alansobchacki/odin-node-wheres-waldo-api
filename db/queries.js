const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new target for players to find
// Will only be executed on an initialize-database script
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
      name: name,
      xCoords: { gte: Math.floor(x) - 1, lte: Math.ceil(x) + 1 },
      yCoords: { gte: Math.floor(y) - 1, lte: Math.ceil(y) + 1 },
    }
  });

  return target !== null;
}

// Create a new player (will only be called after someone wins a game)
async function createPlayer(name, score) {
  return await prisma.player.create({
    data: {
      name: name,
      score: score
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
