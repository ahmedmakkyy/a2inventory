import { Request, Response } from "express";
import { ProductService } from "./product.service";
import Joi from 'joi';

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    variants: Joi.array().items(
        Joi.object({
            type: Joi.string().required(),
            value: Joi.string().required(),
        })
    ).required(),
    inventory: Joi.object({
        quantity: Joi.number().required(),
        inStock: Joi.boolean().required(),
    }).required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    variants: Joi.array().items(
        Joi.object({
            type: Joi.string(),
            value: Joi.string(),
        })
    ),
    inventory: Joi.object({
        quantity: Joi.number(),
        inStock: Joi.boolean(),
    }),
});

const addProduct = async (req: Request, res: Response) => {
    try {
        const { error } = createProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const productData = req.body;
        const result = await ProductService.addProduct(productData);

        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create product',
                error: err.message,
            });
        }
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        const result = await ProductService.getAllProducts(searchTerm as string);

        res.status(200).json({
            success: true,
            message: `Products ${searchTerm ? "matching search term '" + searchTerm + "'" : ""} fetched successfully!`,
            data: result,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Products are not fetched!',
                error: err.message,
            });
        }
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const product = await ProductService.getProductById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve product',
                error: err.message,
            });
        }
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { error } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const productData = req.body;
        const updatedProduct = await ProductService.updateProduct(productId, productData);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to update product',
                error: err.message,
            });
        }
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await ProductService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete product',
                error: err.message,
            });
        }
    }
};

export const ProductControllers = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
