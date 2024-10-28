# stepheb_Mimya_Sprint1
website for Gary Blue

1. Menu Browsing
Users can view available food items through the carousel on the order page.
Menu items include items such as Gravy, Coleslaw, Chicken Burger, and more.
Each menu item is displayed with an image, name, and price.
2. Adding Items to the Order
Clicking the "Add to Order" button below any menu item will add that item to the user's order.
The order summary will display the selected items, their prices, and the total cost.
The summary includes a breakdown of the subtotal, HST (tax) at 15%, and the total amount.
3. Login and Credit Card Validation
Users must first log in with a username and password to submit their order.
Once logged in, the credit card section appears, allowing the user to enter payment details.
The order cannot be submitted unless valid credit card details are provided, including:
A 16-digit credit card number
A valid expiry date in the format MM/YY
A 3-digit CVV code
4. Submitting the Order
Once the user is logged in and has provided valid payment details, they can click the "Submit Order" button.
The order details, including selected items and total cost, will be saved in localStorage as a simulation of submitting the order.
In a real-world application, this data would be sent to a server for processing.
Key Components
1. Carousel Menu (order.js)
The carousel dynamically displays a list of menu items using JavaScript.
The carousel includes duplicate items at the start and end to create a continuous scrolling effect.
Each item includes:
An image
The item name and price (inside a styled oval element)
An "Add to Order" button
2. Order Management (order.js)
The order is managed entirely on the client side using JavaScript.
When an item is added to the order, it appears in the order summary, and the subtotal, tax, and total are updated in real time.
Users can also remove items from the order, and the totals are updated accordingly.
3. Login and Payment Validation
Basic login form with username and password input.
After logging in, users can enter credit card details.
Client-side validation ensures that the credit card number is 16 digits, the expiry date is valid, and the CVV is 3 digits before enabling the "Submit Order" button.
4. LocalStorage Simulation
Once the order is submitted, the order details (including items, subtotal, tax, and total) are stored in localStorage for future reference.
This simulates saving the order on the server in a real-world application.
Technologies Used
HTML: Provides the structure for the web pages.
CSS: Handles the styling, including the carousel, order summary, buttons, and forms.
JavaScript: Powers the dynamic functionality, such as adding items to the order, login validation, credit card validation, and order submission.
