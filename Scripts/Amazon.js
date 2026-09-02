import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHtml = '';

products.forEach((product) => {
    productsHtml += `<div class="product-container">
                    <div class="product-image-container">
                        <img class="product-image"
                        src="${product.image}">
                    </div>

                    <div class="product-name limit-text-to-2-lines">
                        ${product.name}
                    </div>

                    <div class="product-rating-container">
                        <img class="product-rating-stars"
                        src="images/ratings/rating-${product.rating.stars * 10}.png">
                        <div class="product-rating-count link-primary">
                        ${product.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        $${(product.priceCents/100).toFixed(2)}
                    </div>

                    <div class="product-quantity-container">
                        <select class="js-product-quantity">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>
                    </div>

                    <div class="product-spacer"></div>

                    <div class="added-to-cart">
                        <img src="images/icons/checkmark.png">
                        Added
                    </div>

                    <button class="add-to-cart-button button-primary js-Add-To-Cart-Button" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    </div>`;

});

document.querySelector('.js-listingOfProducts').innerHTML = productsHtml;

//functions
function addToCartQuantityUpdate(button) {
    const productContainer = button.closest('.product-container');
    const quantitySelect = productContainer.querySelector('.js-product-quantity');
    const selectedQuantity = Number(quantitySelect.value);
    const productId = button.dataset.productId;
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productByid) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
    } else {
        cart.push({
            productByid: productId,
            quantity: selectedQuantity
        });
    }

    let productsQuantity = 0;
    cart.forEach((item) => {
        productsQuantity += item.quantity;
    });

    const quantityElement = document.querySelector('.cart-quantity');
    if (quantityElement) {
        quantityElement.textContent = String(productsQuantity);
    }

    console.log(cart);
    console.log(productsQuantity);
};
function setTime(button) {
    setTimeout(function(){
        button.textContent = 'Added';
    }, 1);
    setTimeout(function(){
        button.textContent = 'Add to Cart';
    }, 600);
}


document.querySelectorAll('.js-Add-To-Cart-Button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            addToCartQuantityUpdate(button);
            setTime(button);
        });
    });
