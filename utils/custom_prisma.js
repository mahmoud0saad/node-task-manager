// utils/custom_prisma.js
const { PrismaClient } = require('@prisma/client');

/**
 * @type {PrismaClient}
 */
let customPrisma;

if (!global.customPrisma) {
  global.customPrisma = new PrismaClient();
}

customPrisma = global.customPrisma;


module.exports = customPrisma;