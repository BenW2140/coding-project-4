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
  if (pizza.size === "Extra Large $12") {
    price = 12;
  } else if (pizza.size === "Large $10") {
    price = 10;
  } else if (pizza.size === "Medium $8") {
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

const attachPizzaListeners = function(order) {
  $("#pizza-list").on("click", "li", function() {
    showPizza(this.id, order);
  });
}

const showPizza = function(pizzaId, order) {
  const pizza = order.pizzas[pizzaId - 1];
  let htmlForToppings = ""
  $("#show-pizza").slideDown();
  $("#price").html(pizza.price);
  $("#size").html(pizza.size);
  pizza.toppings.forEach(function(topping) {
    htmlForToppings += topping + " ";
  });
  $("#toppings").html(htmlForToppings);
}

const displayPizza = function(order) {
  let pizzaList = $("#pizza-list");
  let htmlForPizzaDisplay = "";
  order.pizzas.forEach(function(pizza) {
    htmlForPizzaDisplay += '<li id=' + pizza.id + '>' + 'Pizza' + pizza.id + '</li>';
  });
  pizzaList.html(htmlForPizzaDisplay);
}

$(document).ready(function() {
  let order = new Order;
  attachPizzaListeners(order);
  $("#new-pizza").submit(function(event) {
    event.preventDefault();
    $("#order").slideUp();
    $("#show-pizza").slideUp();
    const size = $("#sizes").val();
    let pizza = order.addToOrder(size);
    $("input:checkbox[name=topping]:checked").each(function() {
      pizza.toppings.push($(this).val());
    });
    $("#confirm").show();
  });
  $("#confirm").click(function() {
    $("#show-pizza").slideUp();
    let total = calculateTotal(order);
    $("#total").text(total);
    displayPizza(order);
    $("#order").slideDown();
    order = new Order;
    $("#confirm").hide();
  });
});