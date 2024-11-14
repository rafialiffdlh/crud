'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from '@/components/ui/menubar';

const Navbar = () => {
  return (
    <Menubar className="menubar-class">
      {/* Menu Product */}
      <MenubarMenu>
        <Link href="/product" passHref>
          <MenubarTrigger asChild>
            <div>Product</div>
          </MenubarTrigger>
        </Link>
      </MenubarMenu>

      {/* Menu Brand */}
      <MenubarMenu>
        <MenubarTrigger>Brand</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default Navbar;
