const { Router } =  require('express');

const router = Router();

router.get('/', (req, res, next) => {
  return res.render('index.ejs');
});

router.get('/cart', (req, res, next) => {
  const subTotal = req.session.cart.reduce((a, i) => a + i.price * i.qty, 0);
  return res.render('cart.ejs',{subTotal});
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

  req.session.achievement = req.session.achievement || initAchievement();
  req.session.achievement.progress++;
  
  return res.json({
    cart: req.session.cart,
    achievement: req.session.achievementsEnabled ? req.session.achievement : null
  });
});

router.post('/api/v1/cart/clear', (req, res, next) => {
  req.session.cart = [];
  req.session.achievement = initAchievement();
  return res.json({
    success: true,
    cart: req.session.cart,
    achievement: req.session.achievementsEnabled ? req.session.achievement : null
  });
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
      src: 'img/trophy.svg'
    },
    requiredCondition: {
      statistic: 'totalCount',
      operator: 'gte',
      qty: 3
    }
  };
}