"use client";

import { type ReactNode } from "react";

// import { useState } from "react";

import {
  Call,
  Home,
  Profile2User,
  ReceiptEdit,
  ShoppingCart,
  User,
} from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/providers/CartProvider";

import { Button } from "../button/button";

// import CartDrawer from "../cart drawer/CartDrawer";

import styles from "./header.module.css";

const Header = (): ReactNode => {
  const { items } = useCart();
  // const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logowrapper}>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={160} height={160} />
          </Link>
        </div>
        <div className={styles.navwrapper}>
          <nav>
            <ul>
              <li className={styles.listItem}>
                <Home size={16} />
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li className={styles.listItem}>
                <ShoppingCart size={16} />
                <Link href="#">فروشگاه</Link>
              </li>
              <li className={styles.listItem}>
                <Profile2User size={16} />
                <Link href="#">درباره ما</Link>
              </li>
              <li className={styles.listItem}>
                <Call size={16} />
                <Link href="#">تماس با ما</Link>
              </li>
              <li className={styles.listItem}>
                <ReceiptEdit size={16} />
                <Link href="#">وبلاگ</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.headericons}>
          <div className={styles.iconwrapper}>
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
            </Button>
            {items?.length !== undefined && (
              <div className={styles.cartcount}>{items.length}</div>
            )}
          </div>

          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
        </div>
      </header>
      {/* <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} /> */}
    </>
  );
};

export default Header;
