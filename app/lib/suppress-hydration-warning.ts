// Suppress hydration warnings caused by browser extensions
export function suppressHydrationWarning() {
  if (typeof window !== 'undefined') {
    // Store the original console.error
    const originalError = console.error;
    
    // Override console.error
    console.error = (...args) => {
      // Check if it's a hydration error related to tag assistant attributes
      const errorString = args[0]?.toString() || '';
      
      // List of known browser extension attributes that cause hydration issues
      const extensionAttributes = [
        'data-tag-assistant-present',
        'data-tag-assistant-prod-present',
        'data-grammarly-shadow-root',
        'data-lastpass-icon-root',
        'data-dashlane-observed',
      ];
      
      // Check if the error contains any of these attributes
      const isExtensionRelatedError = extensionAttributes.some(attr => 
        errorString.includes(attr)
      );
      
      // Also check for the specific hydration mismatch error
      const isHydrationError = errorString.includes('hydration-mismatch') || 
                               errorString.includes('Hydration failed') ||
                               errorString.includes('did not match');
      
      // Suppress the error if it's related to browser extensions
      if (isHydrationError && isExtensionRelatedError) {
        return; // Don't log this error
      }
      
      // Otherwise, call the original console.error
      originalError.apply(console, args);
    };
  }
} 