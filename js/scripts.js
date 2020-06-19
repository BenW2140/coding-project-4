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
  this.toppings = [],
  this.price = 0
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

const calculateTotal = function(order) {
  let total = 0;
  order.pizzas.forEach(function(pizza) {
    pizza.price = pizza.calculatePrice(pizza);
    total += pizza.price;
  });
  return total;
}

$(document).ready(function() {
  let order = new Order;
  $("#new-pizza").submit(function(event) {
    event.preventDefault();
    $("#order").hide();
    const size = $("#size").val();
    let pizza = order.addToOrder(size);
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
  });
  $("#finish").click(function() {
    let total = calculateTotal(order);
    $("#total").text(total);
    $("#order").show();
    order = new Order;
  });
});