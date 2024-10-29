// Array of food items with image, name, description, and price
const foodItems = [ 
  { src: './images/gravy.webp', name: 'Gravy', description: 'A rich and savory gravy, crafted from our secret recipe, perfect for adding an extra layer of deliciousness to your fries, mashed potatoes, or any meal.', price: '$2.00' },
  { src: './images/coleslaw.webp', name: 'Coleslaw', description: 'A refreshing blend of crunchy cabbage and carrots, tossed in a tangy and creamy dressing, making it the perfect side for any dish.', price: '$2.00' },
  { src: './images/mashedPotatoes.webp', name: 'Mashed Potatoes', description: 'Smooth, buttery mashed potatoes whipped to perfection. The ultimate comfort food, perfect on its own or smothered with our signature gravy.', price: '$1.00' },
  { src: './images/taters.webp', name: 'Taters', description: 'Golden, crispy tater tots that are fried to perfection—crispy on the outside and fluffy on the inside. A bite-sized snack everyone loves.', price: '$1.00' },
  { src: './images/chickenBurger.webp', name: 'Chicken Burger', description: 'A tender, juicy chicken patty, topped with fresh lettuce, tomato, and mayo, served on a soft bun. Comes with a side of crispy fries and a refreshing drink.', price: '$10.00' },
  { src: './images/doubleSandwich.webp', name: 'Double Burger', description: 'Double the flavor with two juicy chicken patties, melted cheese, fresh lettuce, and ripe tomatoes, served on a potato bun. A burger lover’s dream.', price: '$14.00' },
  { src: './images/6Nuggets.webp', name: '6 Nuggets', description: 'Six crispy, golden nuggets served with your choice of dipping sauce, a side of hot fries, and a drink. A quick and tasty meal on the go.', price: '$10.00' },
  { src: './images/10Nuggets.webp', name: '10 Nuggets', description: 'Ten pieces of crispy, tender chicken nuggets, paired with your favorite dipping sauces. The perfect sharable snack or satisfying meal.', price: '$14.00' },
  { src: './images/2piece.webp', name: '2 Piece Meal', description: 'Two pieces of our signature fried chicken, seasoned to perfection, served with your choice of sides and a refreshing drink.', price: '$10.00' },
  { src: './images/3piece.webp', name: '3 Piece Meal', description: 'Three pieces of juicy, crispy fried chicken, served with sides and a drink. Enjoy the perfect balance of crunch and flavor.', price: '$12.00' },
  { src: './images/4piece.webp', name: '4 Piece Meal', description: 'Four pieces of our crispy fried chicken, golden and juicy, served with your favorite sides and drink. A meal fit for a feast.', price: '$14.00' },
  { src: './images/10piece.webp', name: '10 Piece Meal', description: 'Ten pieces of perfectly seasoned, crispy fried chicken, enough to share or indulge yourself. Comes with sides and a drink.', price: '$21.00' },
  { src: './images/6Wings.webp', name: '6 Wings', description: 'Six spicy buffalo wings, crispy on the outside and packed with flavor on the inside. Served with a side of ranch for dipping.', price: '$10.00' },
  { src: './images/10Wings.webp', name: '10 Wings', description: 'Ten crispy wings, tossed in our special blend of spicy buffalo sauce. The ultimate treat for wing lovers.', price: '$14.00' }
];

// Get references to the carousel container and the details section
const carouselContainer = document.getElementById('carousel');
const detailsImage = document.querySelector('.food-image img');
const detailsTitle = document.querySelector('.food-description h2');
const detailsDescription = document.querySelector('.food-description p:first-of-type');
const detailsPrice = document.querySelector('.price');

// Function to populate the carousel dynamically based on the foodItems array
function populateCarousel() {
const firstItems = foodItems.slice(0, 5); // First 5 items
const lastItems = foodItems.slice(-5);    // Last 5 items

// Create and append the last 5 items to the beginning
lastItems.forEach(item => {
  const carouselItem = createCarouselItem(item);
  carouselContainer.insertBefore(carouselItem, carouselContainer.firstChild);
});

// Create and append all original items
foodItems.forEach(item => {
  const carouselItem = createCarouselItem(item);
  carouselContainer.appendChild(carouselItem);
});

// Create and append the first 5 items to the end
firstItems.forEach(item => {
  const carouselItem = createCarouselItem(item);
  carouselContainer.appendChild(carouselItem);
});
}

// Helper function to create a carousel item
function createCarouselItem(item) {
// Create a carousel item div
const carouselItem = document.createElement('div');
carouselItem.classList.add('carousel-item');

// Create the oval with name and price
const oval = document.createElement('div');
oval.classList.add('oval');
oval.innerHTML = `${item.name}<br>${item.price}`;

// Create the image element
const img = document.createElement('img');
img.src = item.src;
img.alt = item.name;

// Add event listener to the image to display details on click
img.addEventListener('click', () => {
  displayDetails(item);
});

// Append the oval and image to the carousel item
carouselItem.appendChild(oval);
carouselItem.appendChild(img);

return carouselItem;
}

// Function to display details of the selected menu item
function displayDetails(item) {
detailsImage.src = item.src;
detailsTitle.textContent = item.name;
detailsDescription.textContent = item.description;
detailsPrice.textContent = item.price;
}

// Populate the carousel on page load
populateCarousel();
