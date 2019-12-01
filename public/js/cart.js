window.addEventListener('load', function() {

  document.getElementById('button-shopping-cart').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/cart';
  });

  document.getElementById('button-checkout').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = '/cart'
    const request = new XMLHttpRequest();
    request.open('POST', '/api/v1/cart/clear');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function() {
      const response = JSON.parse(request.responseText);
      if (response.success) {
        window.location.href = '/';
      }
    };
    request.send(JSON.stringify({ reset: true }));
  });


});