document.addEventListener("DOMContentLoaded", function () {
 // Array of food items with image, name, and price
const foodItems = [
  { src: './images/gravy.webp', name: 'Gravy', price: 2.00 },
  { src: './images/coleslaw.webp', name: 'Coleslaw', price: 2.00 },
  { src: './images/mashedPotatoes.webp', name: 'Mashed Potatoes', price: 1.00 },
  { src: './images/taters.webp', name: 'Taters', price: 1.00 },
  { src: './images/chickenBurger.webp', name: 'Chicken Burger', price: 10.00 },
  { src: './images/doubleSandwich.webp', name: 'Double Burger', price: 14.00 },
  { src: './images/6Nuggets.webp', name: '6 Nuggets', price: 10.00 },
  { src: './images/10Nuggets.webp', name: '10 Nuggets', price: 14.00 },
  { src: './images/2piece.webp', name: '2 Piece Meal', price: 10.00 },
  { src: './images/3piece.webp', name: '3 Piece Meal', price: 12.00 },
  { src: './images/4piece.webp', name: '4 Piece Meal', price: 14.00 },
  { src: './images/10piece.webp', name: '10 Piece Meal', price: 21.00 },
  { src: './images/6Wings.webp', name: '6 Wings', price: 10.00 },
  { src: './images/10Wings.webp', name: '10 Wings', price: 14.00 }
];

  const carouselContainer = document.getElementById('carousel');
  const order = [];
  const taxRate = 0.15;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = null;  // Track the currently signed-in user

  function populateCarousel() {
      foodItems.forEach(item => {
          const carouselItem = document.createElement('div');
          carouselItem.classList.add('carousel-item');

          const oval = document.createElement('div');
          oval.classList.add('oval');
          oval.innerHTML = `${item.name}<br>$${item.price.toFixed(2)}`;

          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.name;

          const addButton = document.createElement('button');
          addButton.textContent = 'Add to Order';
          addButton.classList.add('add-to-order');
          addButton.setAttribute('data-item-name', item.name);
          addButton.setAttribute('data-item-price', item.price);

          carouselItem.appendChild(oval);
          carouselItem.appendChild(img);
          carouselItem.appendChild(addButton);
          carouselContainer.appendChild(carouselItem);
      });
  }

  // Handle adding items to the order
  function addToOrder(itemName, itemPrice) {
      order.push({ name: itemName, price: itemPrice });
      displayOrderItems();
  }

  function removeFromOrder(index) {
      order.splice(index, 1);
      displayOrderItems();
  }

  function displayOrderItems() {
      const orderList = document.getElementById('order-items');
      orderList.innerHTML = '';

      order.forEach((item, index) => {
          const itemRow = document.createElement('div');
          itemRow.classList.add('item-row');

          const itemName = document.createElement('div');
          itemName.textContent = item.name;
          itemRow.appendChild(itemName);

          const itemPrice = document.createElement('div');
          itemPrice.textContent = `$${item.price.toFixed(2)}`;
          itemRow.appendChild(itemPrice);

          const removeButton = document.createElement('button');
          removeButton.textContent = 'Remove';
          removeButton.addEventListener('click', () => removeFromOrder(index));
          itemRow.appendChild(removeButton);

          orderList.appendChild(itemRow);
      });

      updateOrderSummary();
  }

  function updateOrderSummary() {
      const subtotal = order.reduce((total, item) => total + item.price, 0);
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
      document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }

  function showAlert(message, type) {
      let diva = document.createElement("div");
      diva.innerText = message;
      diva.className = type;
      diva.id = "box";
      document.getElementById("notify").appendChild(diva);
      setTimeout(() => {
          document.getElementById("box").remove();
      }, 3000);
  }

  // Automatically log the user in after registration
  function autoLogin(email, password) {
      currentUser = { email, password };
      document.getElementById("submitOrder").style.display = "block"; // Unlock submit order button
      showAlert("You are successfully logged in!", "success");
  }

  // Register a new user
  document.querySelector(".register").addEventListener("click", function (event) {
      event.preventDefault();

      // Show extra fields for registration
      document.getElementById('extra-fields').style.display = 'block';
      document.querySelector('.sign').style.display = 'none'; // Hide the Sign-In button during registration

      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let creditCard = document.getElementById("creditCard").value;
      let expiry = document.getElementById("expiry").value;
      let cvv = document.getElementById("cvv").value;

      // Validate registration fields
      if (!email || !password || !creditCard || !expiry || !cvv) {
          showAlert("All fields are required for registration.", "reenter");
          return;
      }

      // Check if the user already exists
      let isUserExists = users.some(user => user.email === email);
      if (isUserExists) {
          showAlert("User already registered. Please sign in.", "reenter");
          return;
      }

      // Save the new user
      let newUser = { email, password, creditCard, expiry, cvv };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto-login after successful registration
      autoLogin(email, password);
  });

  // Sign in an existing user
  document.querySelector(".sign").addEventListener("click", function (event) {
      event.preventDefault();

      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      let foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
          currentUser = foundUser;
          showAlert("Signed in successfully!", "success");
          document.getElementById("submitOrder").style.display = "block"; // Unlock submit order button
      } else {
          showAlert("Invalid email or password. Please try again.", "reenter");
      }
  });

  // Submit the order via email
  document.getElementById("submitOrder").addEventListener("click", function () {
      if (!currentUser) {
          showAlert("Please sign in to submit your order.", "reenter");
          return;
      }

      const email = currentUser.email;
const creditCard = currentUser.creditCard;
const orderDetails = order.map(item => `${item.name}: $${item.price.toFixed(2)}`).join(', ');
const totalAmount = document.getElementById("total").textContent;

const mailto = `mailto:stephen.badcock@keyin.com?subject=Order%20Details&body=User%20Email: ${email}%0AOrder: ${orderDetails}%0ACredit Card: ${creditCard}%0ATotal: ${totalAmount}`;

window.location.href = mailto;

  });

  // Add event listener to dynamically generated "Add to Order" buttons
  document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("add-to-order")) {
          const itemName = e.target.getAttribute("data-item-name");
          const itemPrice = parseFloat(e.target.getAttribute("data-item-price"));
          addToOrder(itemName, itemPrice);
      }
  });

  // Populate the carousel on page load
  populateCarousel();
});
