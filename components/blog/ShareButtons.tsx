'use client'; 

import { useState, useEffect } from 'react';
import { Link as LinkIcon, Facebook, Twitter, Linkedin, Check } from 'lucide-react';
// Removido Share2 se não for usado diretamente aqui, ou adicione se necessário.

interface ShareButtonsProps {
  title: string;
  // url: string; // URL será obtida do window.location.href
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const copyToClipboard = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentUrl) {
    return null; 
  }

  return (
    <div>
      <h3 className="font-futuru text-brand-purple text-base font-semibold mb-2">Compartilhar</h3>
      <div className="flex items-center gap-1">
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartilhar no Twitter" 
          className="p-1.5 rounded-full hover:bg-brand-light-green text-gray-600 hover:text-brand-purple transition-colors"
        >
          <Twitter size={18} />
        </a>
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartilhar no Facebook" 
          className="p-1.5 rounded-full hover:bg-brand-light-green text-gray-600 hover:text-brand-purple transition-colors"
        >
          <Facebook size={18} />
        </a>
        <a 
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartilhar no LinkedIn" 
          className="p-1.5 rounded-full hover:bg-brand-light-green text-gray-600 hover:text-brand-purple transition-colors"
        >
          <Linkedin size={18} />
        </a>
        <button 
          aria-label="Copiar Link" 
          className="p-1.5 rounded-full hover:bg-brand-light-green text-gray-600 hover:text-brand-purple transition-colors" 
          onClick={copyToClipboard}
          disabled={!currentUrl}
        >
          {copied ? <Check size={18} className="text-brand-green" /> : <LinkIcon size={18} />}
        </button>
      </div>
    </div>
  );
} 