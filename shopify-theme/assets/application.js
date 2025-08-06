// Shopify-specific JavaScript for Renshuu Republic

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for sticky header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Cart Functionality for Shopify
class ShopifyCart {
    constructor() {
        this.cartCountElements = document.querySelectorAll('.cart-count');
        this.cartButtons = document.querySelectorAll('.cart-btn');
        this.init();
    }

    init() {
        this.updateCartCount();
        this.bindEvents();
    }

    bindEvents() {
        // Bind product form submissions
        document.querySelectorAll('.product-form').forEach(form => {
            form.addEventListener('submit', this.handleAddToCart.bind(this));
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    async handleAddToCart(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;

        // Show loading state
        this.setButtonLoading(button, true);

        try {
            const response = await fetch(window.routes.cart_add_url, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                this.showAddToCartSuccess(button);
                await this.updateCartCount();
                
                // Optional: Show cart drawer or redirect
                // this.showCartDrawer();
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (error) {
            this.showAddToCartError(button, error.message);
        } finally {
            setTimeout(() => {
                this.setButtonLoading(button, false);
                button.innerHTML = originalButtonText;
            }, 2000);
        }
    }

    setButtonLoading(button, loading) {
        const spinner = button.querySelector('.loading-overlay__spinner');
        const text = button.querySelector('span');
        
        if (loading) {
            if (spinner) spinner.classList.remove('hidden');
            if (text) text.style.opacity = '0.5';
            button.disabled = true;
        } else {
            if (spinner) spinner.classList.add('hidden');
            if (text) text.style.opacity = '1';
            button.disabled = false;
        }
    }

    showAddToCartSuccess(button) {
        const originalClasses = button.className;
        button.innerHTML = '<span>Added to Cart!</span>';
        button.className = button.className.replace('bg-brand-600 hover:bg-brand-700', 'bg-green-500 hover:bg-green-600');
        
        // Reset after delay
        setTimeout(() => {
            button.className = originalClasses;
        }, 2000);
    }

    showAddToCartError(button, message) {
        const originalClasses = button.className;
        button.innerHTML = '<span>Error - Try Again</span>';
        button.className = button.className.replace('bg-brand-600 hover:bg-brand-700', 'bg-red-500 hover:bg-red-600');
        
        console.error('Add to cart error:', message);
    }

    async updateCartCount() {
        try {
            const response = await fetch('/cart.js');
            const cart = await response.json();
            
            this.cartCountElements.forEach(element => {
                element.textContent = cart.item_count;
            });

            // Update cart button text
            this.cartButtons.forEach(button => {
                if (button.textContent.includes('Cart')) {
                    button.innerHTML = button.innerHTML.replace(/Cart \(\d+\)/, `Cart (${cart.item_count})`);
                }
            });
        } catch (error) {
            console.error('Failed to update cart count:', error);
        }
    }
}

// Newsletter Functionality
class NewsletterHandler {
    constructor() {
        this.forms = document.querySelectorAll('.newsletter-form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        });
    }

    handleSubmit(event) {
        // Let Shopify handle the form submission
        // Add any custom tracking or UI feedback here
        const form = event.target;
        const button = form.querySelector('.newsletter-btn');
        const input = form.querySelector('.newsletter-input');
        
        if (!this.isValidEmail(input.value)) {
            event.preventDefault();
            this.showError(input, 'Please enter a valid email address');
            return;
        }

        // Show loading state
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Reset button after delay (form will refresh page)
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(input, message) {
        input.classList.add('border-red-400');
        const originalPlaceholder = input.placeholder;
        input.placeholder = message;
        
        setTimeout(() => {
            input.classList.remove('border-red-400');
            input.placeholder = originalPlaceholder;
        }, 3000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.initializeObserver();
    }

    initializeObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, this.observerOptions);

            // Observe elements
            document.querySelectorAll('.group, .feature-card').forEach(el => {
                el.classList.add('animate-out');
                this.observer.observe(el);
            });
        }
    }
}

// Predictive Search (if needed later)
class PredictiveSearch {
    constructor() {
        this.searchInput = document.querySelector('input[type="search"]');
        this.searchResults = document.querySelector('.predictive-search');
        this.init();
    }

    init() {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
    }

    async handleSearch(event) {
        const query = event.target.value.trim();
        if (query.length < 2) {
            this.hideResults();
            return;
        }

        try {
            const response = await fetch(`${window.routes.predictive_search_url}?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=8`);
            const results = await response.json();
            this.displayResults(results);
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    displayResults(results) {
        if (!this.searchResults) return;
        
        // Implementation for displaying search results
        // This would render product suggestions
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('hidden');
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 Renshuu Republic Shopify store initialized');
    
    // Initialize all components
    const cart = new ShopifyCart();
    const newsletter = new NewsletterHandler();
    const scrollAnimations = new ScrollAnimations();
    // const predictiveSearch = new PredictiveSearch();

    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-out {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .spinner {
            animation: rotator 1.4s linear infinite;
        }
        
        .spinner .path {
            stroke-dasharray: 187;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: dash 1.4s ease-in-out infinite;
        }
        
        @keyframes rotator {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(270deg); }
        }
        
        @keyframes dash {
            0% { stroke-dashoffset: 187; }
            50% { stroke-dashoffset: 46.75; transform: rotate(135deg); }
            100% { stroke-dashoffset: 187; transform: rotate(450deg); }
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-out,
            .animate-in {
                transition: none;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Export for potential use in other scripts
window.RenshuuRepublic = {
    ShopifyCart,
    NewsletterHandler,
    ScrollAnimations
};