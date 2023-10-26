// // Function to populate product details
// function populateProductDetails() {
//     // Extract the product ID from the URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const productId = urlParams.get("product");
//     console.log(productId);

//     // Find the product with the matching ID from your data source (e.g., sneakers array)
//     // const sneakersID = sneakers.map((sneaker) => sneaker.id);
//     const product = sneakers.find((sneaker) => sneaker.id === productId);
//     console.log(product);

//     // Check if a product was found
//     // product returns undefined ecen if the product id is correct explain why


//     if (product) {
//         // Populate the product details on the page
//         const productImageElement = document.getElementById("productImage");
//         const productTitleElement = document.getElementById("productTitle");
//         const productDescriptionElement = document.getElementById("productDescription");

//         // Set the product image, title, and description
//         productImageElement.innerHTML = `<img src="${product.img}" alt="${product.name}" />`;
//         productTitleElement.textContent = product.name;
//         productDescriptionElement.textContent = product.description;

//         // Add more code to populate other details as needed
//     } else {
//         // Handle the case where the product with the specified ID was not found
//         console.log("Product not found");
//     }
// }

// // Call the function to populate product details when the page loads
// window.addEventListener("load", populateProductDetails);

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("product");
console.log(productId);
const product = findProductById(productId);

function findProductById(productId) {
    for (let i = 0; i < sneakers.length; i++) {
        if (sneakers[i].id === productId) {
            return sneakers[i]; // Found a matching product
        }
    }
    return null; // Product not found
}

if (product) {
    // Product found, you can use 'product' here
    console.log(product);
} else {
    // Handle the case where the product with the specified ID was not found
    console.log("Product not found");
}

window.addEventListener("load", findProductById);