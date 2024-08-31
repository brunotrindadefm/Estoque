    import { Router } from 'express';
    import productsController from '../controller/controller';
    import upload from '../middleware/multer';

    const routes = Router();

    routes.get('/products', productsController.getProductsController);
    routes.post('/products', upload.single('image'), productsController.createProductController);
    routes.patch('/products/stock/:id', productsController.updatedStockController);
    routes.delete('/products/:id', productsController.deleteProductController);
    routes.patch('/products/:id', upload.single('image'), productsController.updatedProductController);

    export default routes;