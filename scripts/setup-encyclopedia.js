/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  console.log('Certifique-se de que NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão definidas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Função para executar SQL
async function executeSql(sql) {
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
  if (error) {
    throw error;
  }
  return data;
}

// Função para executar migração
async function runMigration() {
  console.log('🔄 Executando migração da base de dados...');
  
  const migrationFile = path.join(__dirname, 'migrate-encyclopedia-db.sql');
  const migrationSql = fs.readFileSync(migrationFile, 'utf-8');
  
  // Dividir o SQL em comandos individuais
  const commands = migrationSql
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
  
  for (const command of commands) {
    try {
      if (command.toLowerCase().includes('create table') || 
          command.toLowerCase().includes('create index') || 
          command.toLowerCase().includes('create trigger') ||
          command.toLowerCase().includes('create function')) {
        
        // Executar comando diretamente via SQL
        const { error } = await supabase.rpc('exec_sql', { sql_query: command });
        if (error && !error.message.includes('already exists')) {
          console.error('Erro ao executar comando:', error);
        }
      }
    } catch (error) {
      console.error('Erro na migração:', error);
    }
  }
  
  console.log('✅ Migração concluída');
}

// Função principal
async function setupEncyclopedia() {
  try {
    console.log('🚀 Iniciando configuração da enciclopédia...\n');
    
    // 1. Executar migração
    await runMigration();
    
    // 2. Importar e executar população
    const { populateEncyclopedia } = require('./populate-encyclopedia-from-md.js');
    await populateEncyclopedia();
    
    console.log('\n🎉 Configuração da enciclopédia concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  setupEncyclopedia();
}

module.exports = { setupEncyclopedia }; 