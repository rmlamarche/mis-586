window.addEventListener('load', function() {

  const documentRoot = document.getElementById('documentRoot').value;

  document.getElementById('button-shopping-cart').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = documentRoot + '/cart';
  });

  document.getElementById('button-checkout').addEventListener('click', function(event) {
    event.preventDefault();
    const request = new XMLHttpRequest();
    request.open('POST', documentRoot + '/api/v1/cart/clear');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function() {
      const response = JSON.parse(request.responseText);
      if (response.success) {
        window.location.href = documentRoot + '/';
      }
    };
    request.send(JSON.stringify({ reset: true }));
  });


});