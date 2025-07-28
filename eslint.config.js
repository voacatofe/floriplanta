// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  // Ignorar arquivos (substitui o .eslintignore)
  {
    ignores: [
      // Dependencies
      'node_modules/**',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      
      // Build outputs
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      
      // Generated files
      'lib/generated/**',
      '*.tsbuildinfo',
      
      // Config files
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts',
      
      // Logs
      '*.log',
      
      // IDE
      '.vscode/**',
      '.idea/**',
      
      // OS
      '.DS_Store',
      'Thumbs.db',
      
      // Environment files
      '.env',
      '.env.local',
      '.env.production.local',
      '.env.development.local',
      
      // Docker
      'Dockerfile',
      'docker-compose*.yml',
      
      // Docs and assets
      'docs/**',
      'public/**',
      '*.pdf',
      '*.md',
      
      // Scripts (optional - remova se quiser verificar scripts)
      'scripts/**',
    ],
  },
  
  // Configuração base do ESLint
  eslint.configs.recommended,
  
  // Configurações do TypeScript ESLint
  ...tseslint.configs.recommended,
  
  // Configurações específicas para arquivos TypeScript/JavaScript
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Regras do TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      
      // Regras gerais
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // Regras de estilo
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  
  // Configurações específicas para arquivos TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
  
  // Configurações específicas para Next.js/React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // React específicas
      'react/react-in-jsx-scope': 'off', // Next.js não precisa
      'react/prop-types': 'off', // TypeScript cuida disso
    },
  },
  
  // Configurações para arquivos de configuração
  {
    files: ['**/*.config.{js,mjs,ts}', '**/middleware.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
    },
  },
  
  // Configurações mais relaxadas para JavaScript
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }
);
