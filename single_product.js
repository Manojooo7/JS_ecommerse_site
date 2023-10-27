// Function to populate product details
function populateProductDetails() {
    // Extract the product ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");
    console.log(productId);

    // Find the product with the matching ID from your data source (e.g., sneakers array)
    // const sneakersID = sneakers.map((sneaker) => sneaker.id);
    // convert the sneaker.id id to a string then compare it with productId

    const product = sneakers.find((sneaker) => sneaker.id.toString() === productId);
    console.log(product);

    // Check if a product was found
    // product returns undefined ecen if the product id is correct explain why


    if (product) {
        // Populate the product details on the page
        const productImageElement = document.getElementById("productImage");
        const productTitleElement = document.getElementById("productTitle");
        const productDescriptionElement = document.getElementById("productDescription");
        const pageTitle = document.getElementById("pageTitle");
        console.log(pageTitle);
        // Set the product image, title, and description
        productImageElement.innerHTML = `<img src="${product.img}" alt="${product.name}" />`;
        console.log(productImageElement);
        productTitleElement.textContent = product.name;
        productDescriptionElement.textContent = product.description;
        pageTitle.textContent = product.name;
        // Add more code to populate other details as needed
    } else {
        // Handle the case where the product with the specified ID was not found
        console.log("Product not found");
    }
}

// Call the function to populate product details when the page loads
window.addEventListener("load", populateProductDetails);
