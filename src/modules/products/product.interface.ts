// product.interface.ts
export type Variant = {
    type: string;  // The type of variant (e.g., size, color)
    value: string; // The specific value of the variant (e.g., "Small", "Red")
};

export type Inventory = {
    quantity: number; // The available quantity of the product in stock
    inStock: boolean; // Indicates whether the product is currently in stock
};

export type Product = {
    name: string;        // The name of the product
    description: string; // A brief description of the product
    price: number;       // The price of the product
    category: string;    // The category to which the product belongs
    tags: string[];      // An array of tags or keywords associated with the product
    variants: Variant[]; // An array containing different variants or options of the product
    inventory: Inventory; // An object representing the product's inventory details
};


