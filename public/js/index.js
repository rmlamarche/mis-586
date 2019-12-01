window.addEventListener('load', function() {

  const documentRoot = document.getElementById('documentRoot').value;

  document.getElementById('button-shopping-cart').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = documentRoot + '/cart';
  });

  let toasterTimeout;

  const addToCartButtons = document.querySelectorAll('.card-product__imgOverlay > li > button');
  for (const button of addToCartButtons) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      console.log({event});
      const cardProduct = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
      console.log({cardProduct});
      const itemTitle = cardProduct.querySelector('.card-product__title').innerHTML;
      console.log({itemTitle});
      const itemPrice = parseFloat(cardProduct.querySelector('.card-product__price').innerHTML.replace('$', ''));
      console.log({itemPrice});
      const request = new XMLHttpRequest();
      request.open("POST", documentRoot + '/api/v1/cart/add-item');
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.onload = function() {
        const response = JSON.parse(request.responseText);
        console.log({response});
        const boxPills = document.querySelector('.toast').querySelectorAll('.box-pill');
        console.log({boxPills});
        if (response.achievement && response.achievement.progress >= 1 && response.achievement.progress <= 3) {
          clearTimeout(toasterTimeout);
          document.querySelector('.toast').classList.add('show');
          setTimeout(function() {
            boxPills[0].classList.add(response.achievement.progress >= 1 ? 'active' : 'box-pill');
            boxPills[1].classList.add(response.achievement.progress >= 2 ? 'active' : 'box-pill');
            boxPills[2].classList.add(response.achievement.progress === 3 ? 'active' : 'box-pill');
            if (response.achievement.progress === 3) {
              document.querySelector('.wrapper').classList.add('active');
            }
          }, 150);
          toasterTimeout = setTimeout(function() {
            document.querySelector('.toast').classList.remove('show');
          }, 5000);
        }
      };
      request.send(JSON.stringify({ itemTitle, itemPrice }));
    });
  }

});