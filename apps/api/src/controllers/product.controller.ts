import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/service/product.service';

export class ProductController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.getByIdService(req);
      return res.status(200).json({ message: 'Get Product By Id Success', data, success: true });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.createProduct(req);
      return res.status(201).json({ data, message: 'Create Product Success' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.updateProduct(req);
      return res.status(200).json({ data, message: 'Update Product Success' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ProductService.deleteProduct(req);
      return res.status(200).json({ data, message: 'Delete Product Success' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
