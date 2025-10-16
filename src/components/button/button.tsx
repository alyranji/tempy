import { ComponentProps, ReactNode } from "react";

import clsx from "clsx";

import styles from "./button.module.css";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "animate" | "light" | "primary" | "outline" | "ghost";
  size?: "md" | "lg" | "icon" | "card";
  icon?: ReactNode;
};

export const Button = ({
  variant = "default",
  size = "md",
  className,
  children,
  icon,
  onClick,
  ...otherProps
}: ButtonProps): ReactNode => (
  <button
    className={clsx(styles.button, styles[variant], styles[size], className)}
    onClick={onClick}
    {...otherProps}
  >
    {children}
    {icon}
  </button>
);
