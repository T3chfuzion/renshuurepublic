// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cart functionality
let cartCount = 0;
const cartBtn = document.querySelector('.cart-btn');
const productBtns = document.querySelectorAll('.product-btn');

productBtns.forEach(button => {
    button.addEventListener('click', function() {
        // Update cart count
        cartCount++;
        cartBtn.textContent = `Cart (${cartCount})`;
        
        // Button feedback
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        this.classList.add('bg-green-500', 'hover:bg-green-600');
        
        // Reset button after 1.5 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('bg-green-500', 'hover:bg-green-600');
            this.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 1500);
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterBtn = document.querySelector('.newsletter-btn');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Show success message
        const originalBtnText = newsletterBtn.textContent;
        newsletterBtn.textContent = 'Subscribed!';
        newsletterBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        newsletterBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        
        // Clear input
        newsletterInput.value = '';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            newsletterBtn.textContent = originalBtnText;
            newsletterBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            newsletterBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
        
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription for:', email);
    } else {
        // Show error state
        newsletterInput.classList.add('border-red-400', 'focus:border-red-400');
        newsletterInput.placeholder = 'Please enter a valid email';
        
        setTimeout(() => {
            newsletterInput.classList.remove('border-red-400', 'focus:border-red-400');
            newsletterInput.placeholder = 'Enter your email';
        }, 3000);
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu toggle (if you want to add mobile menu later)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add to cart animation (optional enhancement)
function addToCartAnimation(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Initialize any features that need to run on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Renshuu Republic store loaded successfully!');
    
    // Add any initialization code here
    // For example, load cart count from localStorage if you want persistence
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
        cartCount = parseInt(savedCartCount);
        cartBtn.textContent = `Cart (${cartCount})`;
    }
});

// Save cart count to localStorage when it changes
function updateCartCount(newCount) {
    cartCount = newCount;
    localStorage.setItem('cartCount', cartCount.toString());
    cartBtn.textContent = `Cart (${cartCount})`;
}