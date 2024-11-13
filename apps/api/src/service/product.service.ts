import { Request } from 'express';
import prisma from '@/prisma';
import { ErrorHandler } from '@/helpers/response.helper';
export class ProductService {
    static async getByIdService(req: Request) {
        const { id } = req.params;
        const data = await prisma.products.findUnique({
          where: { id: Number(id) },
          include: { brand: true },
        });  
        if (!data) {
          throw new ErrorHandler(404);
        }  
        return data;
      }
      
  static async createProduct(req: Request) {
    const { brand_Id, name, description, price } = req.body;
    if (!brand_Id || !name || !price) {
      throw new ErrorHandler(400);
    }
    const productData = {
      brand_Id: parseInt(brand_Id),
      name,
      description,
      price: parseInt(price),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await prisma.products.create({ data: productData });
  }

  static async updateProduct(req: Request) {
    const { id } = req.params;
    const { name, description, price, brand_Id } = req.body;
    const productId = parseInt(id);
    if (isNaN(productId)) throw new ErrorHandler(400);
    const updateData: any = {
      updatedAt: new Date(),
    };
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseInt(price);
    if (brand_Id) updateData.brand_Id = parseInt(brand_Id);
    const updatedProduct = await prisma.products.update({
      where: { id: productId },
      data: updateData,
    });
    return updatedProduct;
  }

  static async deleteProduct(req: Request) {
    const { id } = req.params;
    const productId = parseInt(id);
    if (isNaN(productId)) throw new ErrorHandler(400);
    await prisma.products.delete({
      where: { id: productId },
    });
    return { message: 'Product deleted successfully' };
  }
}
