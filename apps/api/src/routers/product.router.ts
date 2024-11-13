import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';

export class ProductRouter {
  private router: Router = Router();
  private productController = new ProductController();

  constructor() {
    this.routes();
  }

  private routes(): void {
    this.router.get('/:id', this.productController.getById);
    this.router.post('/', this.productController.createProduct);
    this.router.put('/:id', this.productController.updateProduct);
    this.router.delete('/:id', this.productController.deleteProduct);
  }

  public getRouter(): Router {
    return this.router;
  }
}
