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

// Get references to the carousel container
const carouselContainer = document.getElementById('carousel');

// Function to populate the carousel dynamically based on the foodItems array
function populateCarousel() {
    const extraItemsStart = foodItems.slice(0, 6);  // First 6 items
    const extraItemsEnd = foodItems.slice(-6);  // Last 6 items
    const fullItems = [...extraItemsEnd, ...foodItems, ...extraItemsStart];  // Add first 6 at end and last 6 at start

    fullItems.forEach(item => {
        // Create a carousel item div
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        // Create the oval with name and price
        const oval = document.createElement('div');
        oval.classList.add('oval');
        oval.innerHTML = `${item.name}<br>$${item.price.toFixed(2)}`;

        // Create the image element
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.name;

        // Create the "Add to Order" button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Order';
        addButton.classList.add('add-to-order');
        addButton.setAttribute('data-item-name', item.name);
        addButton.setAttribute('data-item-price', item.price);

        // Append the oval, image, and add-to-order button to the carousel item
        carouselItem.appendChild(oval);
        carouselItem.appendChild(img);
        carouselItem.appendChild(addButton);

        // Append the carousel item to the carousel container
        carouselContainer.appendChild(carouselItem);
    });
}

// Populate the carousel on page load
populateCarousel();

// Event listener for "Add to Order" buttons
document.addEventListener("click", function(e) {
    if (e.target && e.target.classList.contains("add-to-order")) {
        const itemName = e.target.getAttribute("data-item-name");
        const itemPrice = parseFloat(e.target.getAttribute("data-item-price"));
        addToOrder(itemName, itemPrice);
    }
});

// Order management: handling the display and calculations for the order summary
const taxRate = 0.15;
let order = [];

function addToOrder(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };
    order.push(item);
    displayOrderItems();
}

function removeFromOrder(index) {
    order.splice(index, 1);
    displayOrderItems();
}

function displayOrderItems() {
    const orderList = document.querySelector("#order-items");
    orderList.innerHTML = ''; 

    // Add items to order list
    order.forEach((item, index) => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("item-row");

        const itemName = document.createElement("div");
        itemName.textContent = item.name;
        itemName.classList.add("item-name");

        const itemPrice = document.createElement("div");
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        itemPrice.classList.add("item-price");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromOrder(index));

        itemRow.appendChild(itemName);
        itemRow.appendChild(itemPrice);
        itemRow.appendChild(removeButton);
        orderList.appendChild(itemRow);
    });

    // Update totals
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = order.reduce((total, item) => total + item.price, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
    document.querySelector("#total").textContent = `$${total.toFixed(2)}`;
}