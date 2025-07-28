'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
  slug?: string;
}

interface TagSelectorProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  maxTags?: number;
  allowCreate?: boolean;
  onCreate?: (name: string) => Promise<Option | null>;
}

export function TagSelector({
  selectedValues,
  onChange,
  options,
  placeholder = 'Buscar ou criar...',
  className,
  maxTags,
  allowCreate = false,
  onCreate,
}: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option => 
    !selectedValues.includes(option.id) &&
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const canCreate = allowCreate && 
    searchTerm.trim() && 
    !options.some(option => option.name.toLowerCase() === searchTerm.toLowerCase()) &&
    !selectedValues.some(id => {
      const option = options.find(opt => opt.id === id);
      return option?.name.toLowerCase() === searchTerm.toLowerCase();
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    if (maxTags && selectedValues.length >= maxTags) return;
    
    onChange([...selectedValues, optionId]);
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleRemove = (optionId: string) => {
    onChange(selectedValues.filter(id => id !== optionId));
  };

  const handleCreate = async () => {
    if (!canCreate || !onCreate) return;
    
    setIsCreating(true);
    try {
      const newOption = await onCreate(searchTerm.trim());
      if (newOption) {
        onChange([...selectedValues, newOption.id]);
        setSearchTerm('');
      }
    } catch (error) {
      console.error('Erro ao criar opção:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0].id);
      } else if (canCreate) {
        handleCreate();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const selectedOptions = selectedValues
    .map(id => options.find(option => option.id === id))
    .filter(Boolean) as Option[];

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Selected Tags */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedOptions.map((option) => (
            <Badge key={option.id} variant="secondary" className="flex items-center gap-1">
              {option.name}
              <button
                type="button"
                onClick={() => handleRemove(option.id)}
                className="ml-1 hover:text-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10"
            disabled={maxTags ? selectedValues.length >= maxTags : false}
          />
        </div>

        {/* Dropdown */}
        {isOpen && (filteredOptions.length > 0 || canCreate) && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between"
              >
                <span>{option.name}</span>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
            
            {canCreate && (
              <button
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center justify-between border-t"
              >
                <span className="text-primary">
                  {isCreating ? 'Criando...' : `Criar "${searchTerm}"`}
                </span>
                <Plus className="h-4 w-4 text-primary" />
              </button>
            )}
          </div>
        )}
      </div>

      {maxTags && (
        <p className="text-xs text-muted-foreground mt-2">
          {selectedValues.length}/{maxTags} selecionados
        </p>
      )}
    </div>
  );
}