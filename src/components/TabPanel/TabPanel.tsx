import { ReactNode } from "react";

interface Props {
  value: string;
  currentValue: string;
  children: ReactNode;
}
/**
 * A simple, accessible tab panel.
 * The "hidden" HTML attribute makes sure it is hidden from all presentations, including, for instance, screen readers.
 */
export default function TabPanel({ value, currentValue, children }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== currentValue}
      id={`simple-tabpanel-${currentValue}`}
      aria-labelledby={`simple-tab-${currentValue}`}
    >
      {children}
    </div>
  );
}
