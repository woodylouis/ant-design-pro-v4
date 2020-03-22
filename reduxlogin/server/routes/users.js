import express from 'express';

let router = express.Router();

router.post('/', (req, res) => {
  console.log(res)
});

export default router;