import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckboxProps {
  id?: string;
}

export function Checkbox({ id }: CheckboxProps) {
  return (
    <RadixCheckbox.Root className="w-6 h-6 rounded bg-zinc-900" name={id} id={id}>
      <RadixCheckbox.Indicator className="flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-400" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}