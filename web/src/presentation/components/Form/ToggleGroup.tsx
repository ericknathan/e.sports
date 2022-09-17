import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { useState } from 'react';

type ToggleGroupProps = {
  className?: string;
  items: {
    title: string;
    label: string;
  }[];
  itemStyle?: string;
  activeItemStyle?: string;
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

export function ToggleGroup({
  items,
  itemStyle,
  activeItemStyle,
  selectedValues,
  setSelectedValues,
  ...props
}: ToggleGroupProps) {
  return (
    <RadixToggleGroup.Root
      type="multiple"
      onValueChange={setSelectedValues}
      {...props}
    >
      {items.map(({ title, label }, index) => (
        <RadixToggleGroup.Item
          key={title}
          title={title}
          value={String(index)}
          className={[selectedValues.includes(String(index)) && activeItemStyle, itemStyle].join(' ')}
        >
          {label}
        </RadixToggleGroup.Item>
      ))}
    </RadixToggleGroup.Root>
  )
}