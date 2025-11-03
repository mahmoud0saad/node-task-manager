const express = require('express');
const path = require('path');
require('dotenv').config();

const { authRoute } = require('./routes/auth.route.js');
const { projectRoute } = require('./routes/project.route.js');
const { projectMemberRoute } = require('./routes/project.member.route.js');
const { taskRouter } = require('./routes/task.route.js');
const { commentRouter } = require('./routes/comment.route.js');
const prisma = require('./utils/custom_prisma.js');

const { i18next, middleware } = require('./i18n');
const { ErrorResponse } = require('./utils/response.js');


const app = express();
app.use(express.json());
// @ts-ignore
app.use(middleware.handle(i18next));
app.use('/', (req, res, next) => {
  console.log('all req url is ', req.url);
  next();
});

app.use('/api/auth', authRoute);
app.use('/api/project', projectRoute);
app.use('/api/project/:projectId/member', projectMemberRoute);
app.use('/api/task', taskRouter);
app.use('/api/comment', commentRouter);


app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return ErrorResponse(req, res, null, message, statusCode)
})



process.on("SIGINT", async () => {
  console.log("🔌 Closing Prisma connection...");
  await prisma.$disconnect();
  process.exit(0);
});


app.listen(3001, () => {
  console.log("server is run good on port: 3001");
})
