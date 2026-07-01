import React from "react";
import styles from "./Navbar.module.scss";
import clsx from "clsx";

export type navbarOrientation = "vertical" | "horizontal";

export interface NavbarProps {
  children: React.ReactNode;
  orientation?: navbarOrientation;
}

export const Navbar = ({ children, orientation = "horizontal" }: NavbarProps) => {
  return (
    <nav className={clsx(styles["navbar"], styles[`navbar-${orientation}`])}>
      {children}
    </nav>
  );
};

Navbar.displayName = 'Navbar';
