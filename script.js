// Professional JavaScript for Renshuu Republic Store

// Smooth scrolling with offset for sticky header
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

// Enhanced Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartBtn = document.querySelector('.cart-btn');
        this.updateCartDisplay();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.product-btn').forEach((button, index) => {
            button.addEventListener('click', () => this.addToCart(button, index));
        });
    }

    addToCart(button, productIndex) {
        // Product data (in a real app, this would come from a database)
        const products = [
            { id: 1, name: 'Premium Collection Item', price: 149.99 },
            { id: 2, name: 'Signature Series', price: 199.99 },
            { id: 3, name: 'Essential Collection', price: 89.99 }
        ];

        const product = products[productIndex];
        if (!product) return;

        // Add product to cart
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(this.items));

        // Update display
        this.updateCartDisplay();
        this.showAddToCartFeedback(button);

        // Analytics (placeholder)
        this.trackAddToCart(product);
    }

    updateCartDisplay() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartBtn) {
            this.cartBtn.textContent = `Cart (${totalItems})`;
        }
    }

    showAddToCartFeedback(button) {
        const originalText = button.textContent;
        const originalClasses = button.className;

        // Success feedback
        button.textContent = 'Added to Cart!';
        button.className = button.className.replace('bg-brand-600 hover:bg-brand-700', 'bg-green-500 hover:bg-green-600');

        // Add success animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Reset after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.className = originalClasses;
        }, 2000);
    }

    trackAddToCart(product) {
        // Analytics tracking (placeholder for Google Analytics, etc.)
        console.log('Product added to cart:', product);
        // gtag('event', 'add_to_cart', { currency: 'USD', value: product.price });
    }
}

// Newsletter Functionality
class Newsletter {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.input = document.querySelector('.newsletter-input');
        this.button = document.querySelector('.newsletter-btn');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.input.value.trim();
        
        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        this.showLoading();
        
        // Simulate API call
        setTimeout(() => {
            this.showSuccess();
            this.trackNewsletterSignup(email);
        }, 1000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        this.input.className = this.input.className.replace('border-white/20', 'border-red-400');
        this.input.placeholder = message;
        
        setTimeout(() => {
            this.input.className = this.input.className.replace('border-red-400', 'border-white/20');
            this.input.placeholder = 'Enter your email address';
        }, 3000);
    }

    showLoading() {
        this.button.textContent = 'Subscribing...';
        this.button.disabled = true;
    }

    showSuccess() {
        this.button.textContent = 'Subscribed!';
        this.button.className = this.button.className.replace('bg-white text-brand-600', 'bg-green-500 text-white');
        this.input.value = '';
        
        setTimeout(() => {
            this.button.textContent = 'Subscribe';
            this.button.className = this.button.className.replace('bg-green-500 text-white', 'bg-white text-brand-600');
            this.button.disabled = false;
        }, 3000);
    }

    trackNewsletterSignup(email) {
        console.log('Newsletter signup:', email);
        // gtag('event', 'newsletter_signup', { email });
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
            document.querySelectorAll('.group, .card, .feature').forEach(el => {
                el.classList.add('animate-out');
                this.observer.observe(el);
            });
        }
    }
}

// Mobile Menu (for future implementation)
class MobileMenu {
    constructor() {
        this.menuButton = document.querySelector('.mobile-menu-button');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.menuButton) {
            this.menuButton.addEventListener('click', () => this.toggleMenu());
        }
    }

    toggleMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('hidden');
        }
    }
}

// Header Scroll Effect
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('header');
        this.lastScrollY = window.scrollY;
        this.initializeScrollListener();
    }

    initializeScrollListener() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (this.header) {
            if (currentScrollY > 100) {
                this.header.classList.add('backdrop-blur-lg', 'bg-white/95');
            } else {
                this.header.classList.remove('backdrop-blur-lg', 'bg-white/95');
            }
        }

        this.lastScrollY = currentScrollY;
    }
}

// Product Quick View (placeholder for future feature)
class ProductQuickView {
    constructor() {
        this.modal = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Future implementation for product quick view
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('dblclick', () => {
                console.log('Quick view triggered - future implementation');
            });
        });
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.trackPageLoad();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track Core Web Vitals (placeholder)
            if ('web-vitals' in window) {
                // getCLS, getFID, getFCP, getLCP, getTTFB would be implemented here
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 Renshuu Republic store initialized');
    
    // Initialize all components
    const cart = new ShoppingCart();
    const newsletter = new Newsletter();
    const scrollAnimations = new ScrollAnimations();
    const mobileMenu = new MobileMenu();
    const headerEffects = new HeaderEffects();
    const productQuickView = new ProductQuickView();
    const performanceMonitor = new PerformanceMonitor();

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
        
        @media (prefers-reduced-motion: reduce) {
            .animate-out,
            .animate-in {
                transition: none;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
        if (e.key === '/') {
            e.preventDefault();
            // Focus search if implemented
        }
        
        if (e.key === 'Escape') {
            // Close modals, menus, etc.
            if (mobileMenu.mobileMenu && !mobileMenu.mobileMenu.classList.contains('hidden')) {
                mobileMenu.toggleMenu();
            }
        }
    });

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // navigator.serviceWorker.register('/sw.js');
        });
    }
});

// Utility functions
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
};

// Export for potential use in other scripts
window.RenshuuRepublic = {
    ShoppingCart,
    Newsletter,
    utils
};