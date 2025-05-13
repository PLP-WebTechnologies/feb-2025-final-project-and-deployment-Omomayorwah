document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });

    // Cart count functionality
    updateCartCount();

    // Product page functionality
    if (document.querySelector('.product-grid')) {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                addToCart(productId);
                updateCartCount();
            });
        });
    }

    // Product detail page functionality
    if (document.querySelector('.product-gallery')) {
        const mainImage = document.querySelector('.product-main-img');
        const thumbnails = document.querySelectorAll('.product-thumbnail');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault();
                mainImage.src = this.href;
                mainImage.alt = this.querySelector('img').alt;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Checkout form validation
    if (document.getElementById('checkout-form')) {
        const checkoutForm = document.getElementById('checkout-form');
        
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCheckoutForm()) {
                alert('Order placed successfully!');
                clearCart();
                window.location.href = 'index.html';
            }
        });
    }
});

// Cart functions
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    localStorage.setItem('cartCount', currentCount + 1);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = localStorage.getItem('cartCount') || '0';
        cartCount.textContent = count;
    }
}

function clearCart() {
    localStorage.setItem('cartCount', '0');
    updateCartCount();
}

// Checkout form validation
function validateCheckoutForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    
    if (name === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (address === '') {
        alert('Please enter your address');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}