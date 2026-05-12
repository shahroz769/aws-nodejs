const express = require('express');
const { asc } = require('drizzle-orm');
const { getDb } = require('./db');
const { users } = require('./db/schema');

const app = express();

app.use(express.json());

const healthHandler = (_request, response) => {
  response.send('ok');
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

app.get('/api/users', async (_request, response, next) => {
  try {
    const db = getDb();
    const userList = await db.select().from(users).orderBy(asc(users.id));

    response.json({
      data: userList,
      count: userList.length,
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (request, response, next) => {
  try {
    const { name, email } = request.body;

    if (!name || !email) {
      return response.status(400).json({
        error: 'name and email are required',
      });
    }

    const db = getDb();
    const [createdUser] = await db
      .insert(users)
      .values({ name, email })
      .returning();

    return response.status(201).json({
      data: createdUser,
    });
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({
        error: 'email already exists',
      });
    }

    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);

  response.status(500).json({
    error: error.message || 'Internal server error',
  });
});

module.exports = {
  app,
};
