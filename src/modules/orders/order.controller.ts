import { Request, Response } from "express";
import { OrderService } from "./order.service";
import Joi from 'joi';

// Define Joi schema for the order data
const orderSchema = Joi.object({
    productId: Joi.string().required(),
    price: Joi.number().integer().min(10).required(),
    quantity: Joi.number().integer().min(1).required(),
    email: Joi.string().email().required(),
});

const addOrder = async (req: Request, res: Response) => {
    try {
        // Validate request body against the schema
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const orderData = req.body;
        const result = await OrderService.addOrder(orderData);
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        const result = await OrderService.getAllOrders(email as string); 
        res.status(200).json({
            success: true,
            message: `${email ? "Order fetched successfully for " + "'" + email + "'" : "All order fetched successfully!"} `,
            data: result,
        });
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        res.status(500).json({
            success: false,
            message: 'Products are not fetched!',
            error: err,
        });
    }
};

export const OrderController = {
    addOrder,
    getAllOrders,
};
