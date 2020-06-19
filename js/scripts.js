function Order() {
  this.pizzas = [],
  this.currentId = 0
}

Order.prototype.addToOrder = function(size) {
  let pizza = new Pizza(size);
  pizza.id = ++this.currentId;
  this.pizzas.push(pizza);
  return pizza;
}

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
    if (topping === "Bacon") {
      price += 2;
    } else if (topping === "Sausage" || topping === "Pepperoni") {
      price += 1;
    }
  });
  return price;
}

$(document).ready(function() {
  let order = new Order();
  $("#new-pizza").submit(function(event) {
    event.preventDefault();
    const size = $("#size").val();
    let pizza = order.addToOrder(size);
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
  });
  $("#finish").click(function() {
    const total = order.pizzas[0].calculatePrice(order.pizzas[0]);
    $("#total").text(total);
    $("#order").show();
  })
});