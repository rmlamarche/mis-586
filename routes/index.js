const { Router } =  require('express');

const router = Router();

router.get('/', (req, res, next) => {
  return res.render('index.ejs');
});

router.get('/cart', (req, res, next) => {
  return res.render('cart.ejs');
});

router.post('/api/v1/cart/add-item', (req, res, next) => {
  req.session.cart = req.session.cart || [];
  let foundItemIndex = -1;
  for (let itemIndex in req.session.cart) {
    if (req.session.cart[itemIndex].title === req.body.itemTitle) {
      foundItemIndex = itemIndex;
      break;
    }
  }
  if (foundItemIndex >= 0) {
    req.session.cart[foundItemIndex].qty++;
  } else {
    req.session.cart.push(
      {
        title: req.body.itemTitle,
        price: req.body.itemPrice,
        qty: 1
      }
    );
  }
  return res.json(req.session.cart);
});

router.post('/api/v1/cart/clear', (req, res, next) => {
  req.session.cart = [];
  return res.json(req.session.cart);
});

router.post('/api/v1/achievement/track-progress', (req, res, next) => {
  req.session.achievement.progress++;
  return res.json(req.session.achievement);
});

router.post('/api/v1/achievement/reset-progress', (req, res, next) => {
  req.session.achievement = initAchievement();
  return res.json(req.session.achievement);
});

module.exports = router;

function initAchievement() {
  return {
    progress: 0,
    title: 'Add 3 Items to your Cart',
    pointValue: 1,
    meta: {
      isActive: true,
      expiration: null,
      isHidden: false,
      continueRouting: false,
    },
    badge: {
      title: 'Add 3 Items to your Cart',
      src: 'img/badge.svg'
    },
    requiredCondition: {
      statistic: 'totalCount',
      operator: 'gte',
      qty: 3
    }
  };
}