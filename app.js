
// Dom selection
const productContainer = document.querySelector(".product_container");
const loadMoreButton = document.querySelector(".load_more");
const qtyAddButtons = document.getElementsByClassName("qty_add");
const qtyLessButtons = document.getElementsByClassName("qty_less");
const htmlBody = document.getElementById('body')
// const productQty = document.querySelector(".qty_holder");
const cartButton = document.querySelector(".cart_button");
const cartCloseButton = document.querySelector(".cart_close");
const cartPage = document.querySelector(".cart_page");
const cartOverlay = document.querySelector(".cart_overlay");
// const cartItem = document.getElementsByClassName("cart_item");

// console.log(productQty.value);
// Cart page 

// dom content loaded

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);

} else {
    ready()
}

let totalPrice = 0;
function ready() {


    // add to cart function

    const addToCartButton = document.getElementsByClassName("add_to_cart");
    // console.log(addToCartButton);

    for (let i = 0; i < addToCartButton.length; i++) {
        button = addToCartButton[i];
        button.addEventListener("click", addedToCart);
    }

    function addedToCart(event) {
        let button = event.target;
        let shopProducts = button.parentElement;
        let cartItemName = shopProducts.getElementsByClassName("product_title")[0].innerText.split(' ').slice(0, 4).join(' ');
        let title = cartItemName;
        let price = shopProducts.getElementsByClassName("price")[0].innerText;
        let imgSrc = shopProducts.getElementsByClassName("product_img")[0].src;
        addItemToCart(title, price, imgSrc);

        // Calculate the total price for this product based on its price and quantity
        const quantity = 1; // Replace with the actual quantity selected
        const productTotalPrice = parseFloat(price) * quantity;
        // Update the total price variable
        totalPrice += productTotalPrice;

        // Update the total price display
        updateTotalPriceDisplay();
    }

    function addItemToCart(title, price, imgSrc) {
        let cartRow = document.createElement("div");
        // document.getElementsByClassName("cart_items")[0];
        let cartContainer = document.getElementsByClassName("cart_item_container")[0]
        cartContainer.append(cartRow);
        let cartContent = `
        <div class="cart_item">
        <div class="cart_item_img">
            <img src="${imgSrc}" alt="${title}">
        </div>
        <p class="cart_item_name">${title}</p>
        <div class="cart_qty">
            <input class="qty_holder" type="number" value="1">
        </div>
        <p class="cat_item_price">${price}</p>  
        </p>
        <i class="ri-delete-bin-6-fill remove_item"></i>
        </div>
        `
        cartRow.innerHTML = cartContent;
    }
    function updateTotalPriceDisplay() {
        const totalPriceElement = document.querySelector('.cart_total');
        console.log(totalPrice);
        totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;
    }

    // cart item remove function
    cartPage.addEventListener("click", function (event) {
        const qtyInput = event.target.parentElement.querySelector(".qty_holder");
        const currentValue = parseInt(qtyInput.value);
        // cartItemRemoveFunction();
        const cartItemRemoveFunction = function () {
            if (event.target.classList.contains("remove_item")) {
                // Remove the cart item from the DOM
                let cartItem = event.target.parentElement
                cartItem.remove();
            } if (currentValue < 1) {
                let cartItem = event.target.parentElement.parentElement
                cartItem.remove();

            }
            if (event.target.classList.contains("qty_holder")) {
                updateTotalPrice();
            }
        }
        cartItemRemoveFunction();

    });

    // Function to update the total price when quantity changes
    function updateTotalPrice() {
        totalPrice = 0;
        const quantityInputs = document.querySelectorAll(".qty_holder");
        quantityInputs.forEach(input => {
            // const productRow = input.closest(".cart_row");
            const productRow = input.parentElement.parentElement; // Get the parent cart_item
            const productPriceElement = productRow.querySelector(".cat_item_price");
            const productPrice = parseFloat(productPriceElement.textContent.replace('₹', ''));
            const productQuantity = parseInt(input.value);
            const productTotalPrice = productPrice * productQuantity;
            totalPrice += productTotalPrice;
            // Update the displayed price for the item in the cart
            productPriceElement.textContent = `₹${productTotalPrice.toFixed(2)}`;
        });

        // Update the total price display
        updateTotalPriceDisplay();
    }

}




// cart page opening and closing function
const cartPageToggle = function () {
    cartPage.classList.toggle("hidden");
    htmlBody.classList.toggle("o_hidden");

}
const cartToggleArr = [cartButton, cartCloseButton, cartOverlay,]
for (let i = 0; i < cartToggleArr.length; i++) {
    cartToggleArr[i].addEventListener("click", () => {
        cartPageToggle()
    })
}






// displaying sneakers function

let displayedSneakers = 0; // Track the number of sneakers already displayed

// Function to create and display product cards
function displaySneakers(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
        if (i >= sneakers.length) {
            // All sneakers have been displayed
            loadMoreButton.style.display = "none";
            break;
        }

        const sneaker = sneakers[i];

        const productCard = document.createElement("div");
        productCard.classList.add("products_cards");

        const productImage = document.createElement("img");
        productImage.classList.add("product_img");
        productImage.src = sneaker.img;
        productImage.alt = sneaker.name;

        const otherDetails = document.createElement("div");
        otherDetails.classList.add("other_details");

        const productTitle = document.createElement("h3");
        productTitle.classList.add("product_title");
        productTitle.textContent = sneaker.name;

        const price = document.createElement("h5");
        price.classList.add("price");
        price.textContent = `₹${sneaker.price.toFixed(2)}`;

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add_to_cart");
        addToCartButton.textContent = "Add to Cart";

        otherDetails.appendChild(productTitle);
        otherDetails.appendChild(price);

        productCard.appendChild(productImage);
        productCard.appendChild(otherDetails);
        productCard.appendChild(addToCartButton);

        // Create an event listener to redirect to the product details page
        productImage.addEventListener("click", () => {
            redirectToProductDetailsPage(sneaker.id); // Pass the product's unique identifier
        });

        productContainer.appendChild(productCard);
    }


    // Update the number of sneakers displayed
    /*
    The line displayedSneakers += endIndex - startIndex; is used to keep track of the number of sneakers that have been displayed in the product container. Here's an explanation of what this line does:

    displayedSneakers: This is a variable that keeps track of the total number of sneakers that have been displayed on the web page.

    endIndex - startIndex: This represents the number of sneakers that have just been displayed in the current batch. endIndex is the index of the last sneaker to be displayed in the current batch, and startIndex is the index of the first sneaker to be displayed in the current batch. The difference between these two values gives you the number of sneakers in the current batch.

    displayedSneakers += ...: This is a shorthand way of increasing the displayedSneakers count by the number of sneakers that were just displayed in the current batch. It's equivalent to displayedSneakers = displayedSneakers + (endIndex - startIndex);. This updates the total count of displayed sneakers.

    By keeping track of the total count of displayed sneakers, you can use this information to determine when all sneakers have been displayed and hide the "Load More" button when necessary.
    */
    displayedSneakers += endIndex - startIndex;
}

// Function to redirect to the product details page
function redirectToProductDetailsPage(productId) {
    // Construct the URL for the product details page and pass the product ID as a parameter
    const productDetailsURL = `product_detail.html?product=${productId}`;
    window.location.href = productDetailsURL;
}

// Initial load of the first 8 sneakers
displaySneakers(0, 8);

// Add an event listener to the "Load More" button
loadMoreButton.addEventListener("click", () => {
    const startIndex = displayedSneakers;
    const endIndex = startIndex + 8;
    displaySneakers(startIndex, endIndex);
}); ``

/*
The line `displaySneakers(startIndex, endIndex);` in the event listener is a function call. Let me explain what this line does:

1. `displaySneakers`: `displaySneakers` is the name of a function that was defined earlier in the JavaScript code. It is a custom function that is responsible for creating and displaying product cards for a range of sneaker objects.

2. `(startIndex, endIndex)`: In this function call, you are passing two arguments to the `displaySneakers` function. These arguments specify the range of sneakers to be displayed. `startIndex` is the index of the first sneaker in the range, and `endIndex` is the index of the last sneaker in the range.

For example, if `startIndex` is 8 and `endIndex` is 16, it means you want to display the sneakers at positions 8 through 15 in your `sneakers` array.

The purpose of this line is to call the `displaySneakers` function with the appropriate arguments to load and display the next batch of sneakers when the "Load More" button is clicked. This allows you to control which sneakers are displayed based on the range specified by `startIndex` and `endIndex`.
*/





