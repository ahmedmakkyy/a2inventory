// order.service.ts
import ProductModel from "../products/product.model";
import { Order } from "./order.interface";
import OrderModel from "./order.model";

const addOrder = async (orderData: Order) => {
    try {
        const { productId, quantity } = orderData;

        // Fetch the product from the database
        const product = await ProductModel.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        // Update the inventory
        if (product.inventory.quantity < quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;

        // Save the updated product
        await product.save();

        // Create a new order
        const existingOrder = await OrderModel.findOne({ email: orderData.email });

        // If an order with the provided email and product exists, update the quantity
        if (existingOrder) {
            existingOrder.quantity += orderData.quantity;
            await existingOrder.save();
            // Return the updated order
            return existingOrder;
        }

        // If no order with the provided email and product exists, create a new order
        const order = await OrderModel.create(orderData);

        // Return the created order
        return order;
    } catch (error) {
       
        console.error("Error adding order:", error); 
        throw error;
    }
};

const getAllOrders = async (emailId?: string) => {
    let query = {};
    if (emailId) {
        query = {
            $or: [
                { email: { $regex: emailId, $options: 'i' } },
            ]
        };
    }
    const result = await OrderModel.find(query);
    return result;
};

export const OrderService = {
    addOrder,
    getAllOrders,
}