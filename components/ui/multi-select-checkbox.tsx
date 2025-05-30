'use client';

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"; // Adicionaremos se não existir

export interface MultiSelectOption {
  value: string; // Geralmente o ID
  label: string;
}

interface MultiSelectCheckboxProps {
  options: MultiSelectOption[];
  selectedValues: string[]; // Array de IDs selecionados
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
}

export function MultiSelectCheckbox({
  options,
  selectedValues,
  onChange,
  placeholder = "Selecione...",
  className,
  triggerClassName,
}: MultiSelectCheckboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  const selectedLabels = options
    .filter(option => selectedValues.includes(option.value))
    .map(option => option.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", triggerClassName)}
        >
          <span className="truncate">
            {selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[--trigger-width] p-0", className)}>
        <ScrollArea className="max-h-60">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                <Checkbox
                  id={`multiselect-${option.value}`}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={() => handleSelect(option.value)}
                />
                <label
                  htmlFor={`multiselect-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
            {options.length === 0 && (
                <p className="p-2 text-sm text-muted-foreground">Nenhuma opção disponível.</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
} 