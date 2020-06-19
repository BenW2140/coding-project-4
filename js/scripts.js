function Pizza(size, toppings) {
  this.size = size,
  this.toppings = toppings
}

Pizza.prototype.calculatePrice = function(pizza) {
  let price = 0;
  if (pizza.size === "Large") {
    price = 10;
  } else if (pizza.slice === "Medium") {
    price = 8;
  } else {
    price = 6;
  }
  if (pizza.toppings === "Sausage" || pizza.topping === "Pepperoni") {
    price += 1;
  }
  return price;
}

$(document).ready(function() {
  
});