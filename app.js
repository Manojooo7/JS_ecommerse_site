// dom selections

const productCard = document.querySelector('.products_cards')
const productImg = productCard.querySelector('.product_img')
const productTitle = document.querySelector('.product_title')
const productPrice = document.querySelector('.price')

// Function to create and display sneaker cards
function displaySneakerCards() {
    sneakers.forEach(sneakers => {
        const card = document.createElement("div");
        card.classList.add("products_cards");
        const cardDetails = document.createElement("div")
        card.classList.add("cardDetails")

        // productImg.src = sneakers.img
        // productTitle.textContent = sneakers.name
        // productPrice.textContent = `₹${sneakers.price}`


        productCard.innerHTML = `
                    <img class ="product_img"  src="${sneakers.img}>
                    <div class="other_details">
                    <h3>${sneakers.name}</h3>
                    <h5>₹${sneakers.price}</h5>
                    </div
                `;

        productCard.appendChild(card);
    });
}

// Call the function to display sneaker cards
displaySneakerCards();
