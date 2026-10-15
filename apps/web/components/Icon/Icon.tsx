"use client";

import styles from "./Icon.module.scss";
import { memo, forwardRef, useState } from "react";

import {
  UserIcon,
  SquaresFourIcon,
  TargetIcon,
  TrophyIcon,
  GearIcon,
} from "@phosphor-icons/react";

export type IconSize = "SM" | "MD" | "LG";
export type IconVariant = "regular" | "fill";

export type PhosphorIcon =
  "profile" | "dashboard" | "goals" | "achievements" | "settings";

const iconMap = {
  profile: UserIcon,
  dashboard: SquaresFourIcon,
  goals: TargetIcon,
  achievements: TrophyIcon,
  settings: GearIcon,
} as const;

export interface IconProps {
  id?: string;
  icon: PhosphorIcon;
  size?: IconSize;
  variant?: IconVariant;
}

export const Icon = memo(
  forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { id, icon = "profile", variant = "regular", size = "MD" } = props;

    const isFill = variant === "fill" ? true : false;

    const [isHovered, setIsHovered] = useState(false);

    const RootComponent = iconMap[icon];

    const sizeMap = {
      SM: 24,
      MD: 32,
      LG: 48,
    };

    const resolvedVariant: IconVariant = isHovered
      ? isFill
        ? "regular"
        : "fill"
      : variant;

    return (
      <div
        aria-hidden="true"
        className={styles["icon-container"]}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RootComponent
          ref={ref}
          id={id}
          weight={resolvedVariant}
          size={sizeMap[size]}
        />
      </div>
    );
  })
);

Icon.displayName = "Icon";
