// // import { Icon, type IconVariant, type PhosphorIcon } from "../Icon/Icon";
// // export type LinkIcon = PhosphorIcon;

// import { TabsContext, useTabsContext } from "./TabsContext";

// import React, { useState, memo } from "react";

// // Tabs

// export interface TabsProps {
//   children?: React.ReactNode;
//   defaultValue?: string;
//   value?: string;
//   onChange?: (value: string) => void;
// }

// export const Tabs: React.FC<TabsProps> = memo((props) => {
//   const { children, defaultValue, value, onChange } = props;

//   const [internalValue, setInternalValue] = useState<string | undefined>(
//     defaultValue
//   );

//   const isControlled = value !== undefined;
//   const activeValue = isControlled ? value : internalValue;

//   const setValue = (val: string) => {
//     if (!isControlled) {
//       setInternalValue(val);
//     }
//     onChange?.(val);
//   };

//   return (
//     <TabsContext.Provider value={{ activeValue, setValue }}>
//       {children}
//     </TabsContext.Provider>
//   );
// });

// Tabs.displayName = "Tabs";

// // Tab List

// export interface TabListProps {
//   children?: React.ReactNode;
// }

// export const TabList: React.FC<TabListProps> = memo(({ children }) => {
//   return <div role="tablist">{children}</div>;
// });

// TabList.displayName = "TabList";

// // Tab

// export interface TabProps {
//   value: string;
//   children?: React.ReactNode;
// }

// export const Tab: React.FC<TabProps> = memo(({ value, children }) => {
//   const { activeValue, setValue } = useTabsContext();

//   const isActive = activeValue === value;

//   return (
//     <button
//       role="tab"
//       id={`tab-${value}`}
//       aria-selected={isActive}
//       aria-controls={`panel-${value}`}
//       tabIndex={isActive ? 0 : -1}
//       onClick={() => setValue(value)}
//     >
//       {children}
//     </button>
//   );
// });

// Tab.displayName = "Tab";

// // Tab Panel

// export interface TabPanelProps {
//   value: string;
//   children: React.ReactNode;
// }

// export const TabPanel: React.FC<TabPanelProps> = memo(({ value, children }) => {
//   const { activeValue } = useTabsContext();

//   const isActive = activeValue === value;

//   if (!isActive) return null;

//   return (
//     <div role="tabpanel" id={`panel-${value}`} aria-labelledby={`tab-${value}`}>
//       {children}
//     </div>
//   );
// });

// TabPanel.displayName = "TabPanel";
