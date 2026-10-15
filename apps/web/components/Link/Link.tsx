"use client";

import React, { forwardRef, memo, useState } from "react";
import clsx from "clsx";
import { Icon, type IconVariant, type PhosphorIcon } from "../Icon/Icon";

import styles from "./Link.module.scss";

export type LinkTarget = "_blank" | "_self";
export type LinkSize = "SM" | "MD" | "LG";
export type LinkIcon = PhosphorIcon;

export interface LinkProps {
  id?: string;
  children: React.ReactNode;
  href: string;
  target?: LinkTarget;
  size?: LinkSize;
  iconStart?: LinkIcon;
  iconEnd?: LinkIcon;
  iconWeight?: IconVariant;
  rel?: string;
  isActive?: boolean;
}

export const Link = memo(
  forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const {
      id,
      children,
      href,
      target = "_self",
      size = "MD",
      iconStart,
      iconEnd,
      iconWeight = "regular",
      rel,
      isActive = false,
    } = props;

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isExternalLink =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//");

    const relValue =
      rel ??
      (target === "_blank"
        ? "noopener noreferrer"
        : isExternalLink
          ? "noopener"
          : undefined);

    const renderContent = () => {
      const weight: IconVariant =
        isActive || isHovered || isFocused ? "fill" : iconWeight;

      return (
        <>
          {iconStart && <Icon icon={iconStart} size={size} variant={weight} />}
          {children}
          {iconEnd && <Icon icon={iconEnd} size={size} variant={weight} />}
        </>
      );
    };

    return (
      <a
        id={id}
        href={href}
        ref={ref}
        target={target}
        rel={relValue}
        className={clsx(styles.link, isActive && styles["link-active"])}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {renderContent()}
      </a>
    );
  })
);

Link.displayName = "Link";
