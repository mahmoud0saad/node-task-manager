
const { PrismaClient } = require('@prisma/client');

const customPrisma = new PrismaClient();

async function seedPriorities() {
    await customPrisma.priority.createMany({
        skipDuplicates: true, data: [
            { id: 1, value: 1, title: "Low" },
            { id: 2, value: 2, title: "Medium" },
            { id: 3, value: 3, title: "High" }
        ]
    })
}



seedPriorities()
    .then(() => console.log('Priority seed checked ✅'))
    .catch(console.error);