function Pizza(size) {
  this.size = size,
  this.toppings = []
}

Pizza.prototype.calculatePrice = function(pizza) {
  let price = 0;
  if (pizza.size === "Extra Large") {
    price = 12;
  } else if (pizza.size === "Large") {
    price = 10;
  } else if (pizza.size === "Medium") {
    price = 8;
  } else {
    price = 6;
  }
  pizza.toppings.forEach(function(topping) {
    if (topping === "Sausage" || topping === "Pepperoni") {
      price += 1;
    }
  });
  return price;
}

$(document).ready(function() {
  $("#new-pizza").submit(function(event) {
    event.preventDefault();
    const size = $("#size").val();
    let pizza = new Pizza(size);
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
    const total = pizza.calculatePrice(pizza);
    $("#total").text(total);
    $("#order").show();
  });
});