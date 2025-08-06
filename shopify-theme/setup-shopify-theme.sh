#!/bin/bash

echo "Setting up Renshuu Republic Shopify Theme..."

# Create theme structure
mkdir -p shopify-theme/{assets,config,layout,sections,snippets,templates,locales}

# Copy logo
cp assets/renshuulogo.png shopify-theme/assets/

echo "Theme structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Copy all the code I provided into the respective files"
echo "2. Zip the shopify-theme folder"
echo "3. Upload to Shopify: Online Store > Themes > Add theme > Upload zip file"
echo ""
echo "Files to create:"
echo "- layout/theme.liquid"
echo "- templates/index.liquid"  
echo "- sections/header.liquid"
echo "- sections/hero.liquid"
echo "- sections/featured-products.liquid"
echo "- sections/features.liquid"
echo "- sections/newsletter.liquid"
echo "- sections/footer.liquid"
echo "- snippets/product-card.liquid"
echo "- assets/application.js"
echo "- config/settings_schema.json"
echo "- locales/en.default.json"

