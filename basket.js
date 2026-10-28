// ECLAIRE BASKET //

let basket = JSON.parse(localStorage.getItem("basket")) || [];


// ADD PRODUCT TO BASKET //

const addButton = document.querySelectorAll(".addToBasket").forEach(function(button) {

    button.addEventListener("click", function() {

        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image,
            quantity: 1
        };

        basket.push(product);

        localStorage.setItem("basket", JSON.stringify(basket));

        alert(product.name + " has been added to your basket! 🛒");
    });

});


// DISPLAY BASKET // 

const basketItems = document.getElementById("basket-items");
const basketTotal = document.getElementById("basket-total");

if (basketItems && basketTotal) {

    function displayBasket() {

        basketItems.innerHTML = "";

        let total = 0;

        if (basket.length === 0) {

            basketItems.innerHTML = `
                <div class="empty-basket">
                    <h2>Your basket is empty</h2>
                    <p>Discover something beautiful for your routine.</p>
                    <a href="shop.html">Continue Shopping →</a>
                </div>
            `;

            basketTotal.textContent = "£0.00";
            return;
        }


        basket.forEach(function(product, index) {

            if (!product.quantity) {
                product.quantity = 1;
            }

            const item = document.createElement("div");

            item.className = "basket-item";

            item.innerHTML = `

                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >

                <div class="basket-product-info">

                    <h2>${product.name}</h2>

                    <p class="basket-price">
                        £${product.price.toFixed(2)}
                    </p>

                    <div class="quantity-controls">

                        <button class="minus-button">−</button>

                        <span class="quantity-number">
                            ${product.quantity}
                        </span>

                        <button class="plus-button">+</button>

                    </div>

                    <button class="remove-button">
                        Remove
                    </button>

                </div>
            `;


            // MINUS BUTTON

            item.querySelector(".minus-button")
                .addEventListener("click", function() {

                    if (product.quantity > 1) {

                        product.quantity--;

                    } else {

                        basket.splice(index, 1);

                    }

                    saveBasket();

                });


            // PLUS BUTTON

            item.querySelector(".plus-button")
                .addEventListener("click", function() {

                    product.quantity++;

                    saveBasket();

                });


            // REMOVE BUTTON

            item.querySelector(".remove-button")
                .addEventListener("click", function() {

                    basket.splice(index, 1);

                    saveBasket();

                });


            basketItems.appendChild(item);

            total += product.price * product.quantity;

        });


        basketTotal.textContent = "£" + total.toFixed(2);

    }


    function saveBasket() {

        localStorage.setItem(
            "basket",
            JSON.stringify(basket)
        );

        displayBasket();

    }


    displayBasket();

}