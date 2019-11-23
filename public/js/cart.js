window.addEventListener('load', function() {

  document.getElementById('button-shopping-cart').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/cart';
  });

});