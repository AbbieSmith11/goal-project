import { memo, forwardRef } from "react";

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
  | "profile"
  | "dashboard"
  | "goals"
  | "achievements"
  | "settings";

const iconMap = {
  profile: UserIcon,
  dashboard: SquaresFourIcon,
  goals: TargetIcon,
  achievements: TrophyIcon,
  settings: GearIcon,
} as const;

export interface IconProps {
  id: string;
  icon: PhosphorIcon;
  size: IconSize;
  variant: IconVariant;
}

export const Icon = memo(
  forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { id, icon, variant = "regular", size } = props;

    const RootComponent = iconMap[icon];

    const sizeMap = {
      SM: 24,
      MD: 32,
      LG: 48
    }

    const iconWeight = variant;

    return <RootComponent ref={ref} id={id} weight={iconWeight} size={sizeMap[size]}/>;
  })
);

Icon.displayName = "Icon";
