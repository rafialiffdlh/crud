'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function UpdateProductDialog() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    brand_Id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your API call to update the product
    console.log('Product updated:', product);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="btn-primary">Update Product</button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>
              Modify the details of the product.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={product.description}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="brand_Id" className="block text-sm font-medium">
                Brand ID
              </label>
              <input
                id="brand_Id"
                name="brand_Id"
                type="number"
                value={product.brand_Id}
                onChange={handleChange}
                className="input"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
              </DialogClose>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
