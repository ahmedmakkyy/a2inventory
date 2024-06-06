import express, { Request, Response } from 'express'
import { ProductRoutes } from './modules/products/product.route'
import { OrderRoute } from './modules/orders/order.route';
const app = express()

app.use(express.json());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoute)

// Root URL welcome message
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Product and Order API service"
  });
});


export default app;