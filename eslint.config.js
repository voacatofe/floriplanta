import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Isso aplica as configurações recomendadas do typescript-eslint.
  // tseslint.configs.recommended é um array de objetos de configuração,
  // então o operador spread (...) é usado para passar cada objeto individualmente
  // como um argumento para tseslint.config().
  ...tseslint.configs.recommended
  // Adicionaremos outras configurações (js, react, globals) aqui depois, se isso funcionar.
);
