import React from 'react';
import { PrismaClient } from '@prisma/client';
import AddProduct from './addProduct';
import DeleteProduct from './deleteProduct';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { IBrands } from '@/interface/product.interface';
const prisma = new PrismaClient();

const getProduts = async () => {
  const res = await prisma.products.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      brand: { select: { id: true, name: true } },
    },
  });
  return res;
};
const getBrands = async () => {
  const res = await prisma.brands.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return res;
};
export default async function FormProduct() {
  const [products, brands] = await Promise.all([getProduts(), getBrands()]);
  return (
    <div className="p-4">
      <AddProduct brands={brands} />

      <Table className="min-w-full bg-white">
        <TableCaption>A list of available products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Brand Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.brand.name}</TableCell>
              <TableCell>
                <DeleteProduct id={product.id} name={product.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
