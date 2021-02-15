import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('server is up and running');
});

export { router };
