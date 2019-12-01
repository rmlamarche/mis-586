window.addEventListener('load', function() {

  document.getElementById('button-shopping-cart').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/cart';
  });

  document.getElementById('button-checkout').addEventListener('click', function(event) {
    event.preventDefault();
    // /api/v1/cart/clear
    window.location.href = '/cart'
    const request
  });


});