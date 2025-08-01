'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Debounce implementation that returns an object with exec and cancel methods
function debounce<F extends (...args: Parameters<F>) => void>(
  func: F,
  wait: number,
): { exec: (...args: Parameters<F>) => void; cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return { exec: debounced, cancel };
}

type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

type ValidationErrors<T> = {
  [K in keyof T]?: string | null;
};

interface UseFormValidationOptions<T> {
  initialData: T;
  validationRules?: ValidationRules<T>;
  onSave?: (data: T) => Promise<void>;
  autoSaveDelay?: number;
  validateOnChange?: boolean;
}

export function useFormValidation<T extends Record<string, any>>({
  initialData,
  validationRules = {},
  onSave,
  autoSaveDelay = 2000,
  validateOnChange = true,
}: UseFormValidationOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Função de validação
  const validateField = useCallback((key: keyof T, value: any): string | null => {
    const rules = validationRules[key];
    if (!rules) return null;

    // Required
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'Este campo é obrigatório';
    }

    // String validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        return `Mínimo de ${rules.minLength} caracteres`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        return `Máximo de ${rules.maxLength} caracteres`;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Formato inválido';
      }
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  // Validar todos os campos
  const validateAll = useCallback((): boolean => {
    setIsValidating(true);
    const newErrors: ValidationErrors<T> = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key as keyof T, data[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setIsValidating(false);
    return !hasErrors;
  }, [data, validateField, validationRules]);

  // Auto-save debounced
  const debouncedSave = useRef(
    debounce(async (dataToSave: T) => {
      if (!onSave || !isDirty) return;
      
      setIsSaving(true);
      try {
        await onSave(dataToSave);
        setLastSaved(new Date());
        setIsDirty(false);
      } catch {
        // Silently fail on auto-save to avoid interrupting user flow
      } finally {
        setIsSaving(false);
      }
    }, autoSaveDelay),
  ).current;

  // Atualizar campo
  const updateField = useCallback((key: keyof T, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);

    // Validar campo se habilitado
    if (validateOnChange) {
      const error = validateField(key, value);
      setErrors(prev => ({
        ...prev,
        [key]: error,
      }));
    }
  }, [validateField, validateOnChange]);

  // Atualizar múltiplos campos
  const updateFields = useCallback((updates: Partial<T>) => {
    setData(prev => ({ ...prev, ...updates }));
    setIsDirty(true);

    if (validateOnChange) {
      const newErrors = { ...errors };
      Object.entries(updates).forEach(([key, value]) => {
        const error = validateField(key as keyof T, value);
        newErrors[key as keyof T] = error;
      });
      setErrors(newErrors);
    }
  }, [errors, validateField, validateOnChange]);

  // Reset form
  const reset = useCallback((newData?: T) => {
    const resetData = newData || initialData;
    setData(resetData);
    setErrors({});
    setIsDirty(false);
    setLastSaved(null);
  }, [initialData]);

  // Save manually
  const save = useCallback(async (): Promise<boolean> => {
    if (!validateAll()) {
      return false;
    }

    if (!onSave) return true;

    setIsSaving(true);
    try {
      await onSave(data);
      setLastSaved(new Date());
      setIsDirty(false);
      return true;
    } catch {
      // Return false to indicate failure
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave, validateAll]);

  // Auto-save effect
  useEffect(() => {
    if (isDirty && onSave) {
      debouncedSave.exec(data);
    }
    return () => {
      debouncedSave.cancel();
    };
  }, [data, isDirty, debouncedSave, onSave]);

  // Computed values
  const isValid = Object.values(errors).every(error => !error);
  const hasChanges = isDirty;

  return {
    // Data
    data,
    errors,
    
    // States
    isDirty,
    isValidating,
    isSaving,
    isValid,
    hasChanges,
    lastSaved,
    
    // Actions
    updateField,
    updateFields,
    validateAll,
    reset,
    save,
  };
}