'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch?: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('busca') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(searchQuery);
      return;
    }

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set('busca', searchQuery.trim());
    } else {
      params.delete('busca');
    }
    
    // Reset page to 1 when searching
    params.delete('page');
    
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    
    router.push(newUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    
    if (onSearch) {
      onSearch('');
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete('busca');
    params.delete('page');
    
    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : '/blog';
    
    router.push(newUrl);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-futuru font-bold text-brand-purple mb-3 text-lg flex items-center">
        <Search className="w-5 h-5 mr-2" />
        Buscar no Blog
      </h3>
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Digite sua busca..." 
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <button
          type="submit"
          className="w-full bg-brand-purple text-white py-2 px-4 rounded-md hover:bg-brand-purple/90 transition-colors duration-200 text-sm font-medium"
        >
          Buscar
        </button>
      </form>
      
      {searchQuery && (
        <div className="mt-3 text-sm text-gray-600">
          Buscando por: <span className="font-medium text-brand-purple">"{searchQuery}"</span>
          <button
            onClick={handleClearSearch}
            className="ml-2 text-brand-purple hover:underline"
          >
            Limpar
          </button>
        </div>
      )}
    </div>
  );
}