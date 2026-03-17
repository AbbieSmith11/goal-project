"use client";

import React, { forwardRef, ForwardedRef, memo } from "react";

import { Icon, type IconVariant, type PhosphorIcon } from "../Icon/Icon";

export type LinkTarget = "_blank" | "_self";
export type LinkSize = "SM" | "MD" | "LG";
export type LinkIcon = PhosphorIcon;

interface LinkProps {
  id?: string;
  children: React.ReactNode;
  href: string;
  /** Wether the link should open in a new tab - default is _self */
  target?: LinkTarget;
  size?: LinkSize;
  iconStart?: LinkIcon;
  iconEnd?: LinkIcon;
  iconWeight?: IconVariant;
/** Stands for relationship */
  rel?: string;
}

export const Link = memo(
  forwardRef((props: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
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
    } = props;

    const isExternalLink =
      href && (href.startsWith("http") || href.startsWith("//"));

      // if opening link on new page then remove referrer informaton so the site won't know where the user came from ('noreferrer'). And stop the new tab from being able to control the origional page ('noopener')
    const relValue =
      target === "_blank"
        ? "noopener noreferrer"
        : isExternalLink
        ? "noopener"
        : "undefined";

    return (
      <a id={id} href={href} ref={ref} target={target} rel={rel || relValue}>
        {iconStart && (
          <Icon icon={iconStart} size={size} variant={iconWeight}></Icon>
        )}
        {children}
        {iconEnd && (
          <Icon icon={iconEnd} size={size} variant={iconWeight}></Icon>
        )}
      </a>
    );
  })
);

Link.displayName = "Link";
