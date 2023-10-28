// Populate the product details on the page
const productImageElement = document.getElementById("productImage");
const productTitleElement = document.getElementById("productTitle");
const productDescriptionElement = document.getElementById("productDescription");
const pageTitle = document.getElementById("pageTitle");
const productPrice = document.querySelector(".product_price");
const sizes = document.querySelector(".sizes_container");
const colors = document.querySelector(".color_container");
// Function to populate product details
function populateProductDetails() {
    // Extract the product ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");

    // Find the product with the matching ID from your data source (e.g., sneakers array)
    // const sneakersID = sneakers.map((sneaker) => sneaker.id);
    // convert the sneaker.id id to a string then compare it with productId

    const product = sneakers.find((sneaker) => sneaker.id.toString() === productId);

    // Check if a product was found
    // product returns undefined ecen if the product id is correct explain why
    if (product) {
        // Set the product image, title, and description
        productImageElement.innerHTML = `<img src="${product.productImg}" alt="${product.name}" />`;
        productTitleElement.textContent = product.name;
        productDescriptionElement.textContent = product.description;
        pageTitle.textContent = product.name;
        productPrice.textContent = `₹${product.price}`;

        // Loop through the sizes array and create a span element for each size
        for (let i = 0; i < product.sizes.length; i++) {
            const size = document.createElement("span");
            size.classList.add("sizes");
            size.textContent = product.sizes[i];
            sizes.appendChild(size);
        }
        // Loop through the colors array and create a span element for each color
        for (let i = 0; i < product.color.length; i++) {
            const color = document.createElement("span");
            color.classList.add("colors");
            const gaveColor = document.querySelector(".colors");
            gaveColor.style.backgroundColor = product.color[i];
            console.log(product.color[i]);
            // console.log(color);
            colors.appendChild(color);

        }
        // Add more code to populate other details as needed
    } else {
        // Handle the case where the product with the specified ID was not found
        console.log("Product not found");
    }
}

// Call the function to populate product details when the page loads
window.addEventListener("load", populateProductDetails);
