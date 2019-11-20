const { Router } =  require('express');

const router = Router();

router.get('/', (req, res, next) => {
  return res.send('TODO index.html');
});

module.exports = router;