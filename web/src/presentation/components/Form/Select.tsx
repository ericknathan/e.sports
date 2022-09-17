import * as RadixSelect from '@radix-ui/react-select';
import { CaretDown } from 'phosphor-react';

interface SelectProps extends RadixSelect.SelectProps {
  label: string;
  items: {
    id: string;
    label: string;
  }[];
}

export function Select({ items, label, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger className="flex items-center justify-between h-11 bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
        <RadixSelect.Value placeholder={label} />
        <RadixSelect.Icon>
          <CaretDown size={20}/>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content>
          <RadixSelect.Viewport>
            {
              items.map(({ id, label }) => (
                <RadixSelect.Item
                  id={id}
                  key={id}
                  value={id}
                  className="bg-zinc-900 text-white text-sm py-3 px-4 hover:bg-zinc-800 cursor-pointer first:rounded-t last:rounded-b select-none"
                >
                  <RadixSelect.ItemText className="text-white">{label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))
            }
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}