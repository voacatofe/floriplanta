/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTable() {
  console.log('🔄 Criando tabela encyclopedia_terms_new...');
  
  try {
    // Primeiro, vamos tentar criar alguns dados de teste para ver se a tabela já existe
    const { data: testData, error: testError } = await supabase
      .from('encyclopedia_terms_new')
      .select('count', { count: 'exact', head: true });

    if (!testError) {
      console.log('✅ Tabela encyclopedia_terms_new já existe!');
      console.log(`📊 Total de registros: ${testData || 0}`);
      return true;
    }

    console.log('❌ Tabela não existe, mas não conseguimos criá-la via API.');
    console.log('💡 Você precisa criar a tabela manualmente no Supabase Dashboard.');
    console.log('\n📋 Execute este SQL no Supabase SQL Editor:');
    console.log(`
CREATE TABLE encyclopedia_terms_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Saúde', 'Química', 'Legislação')),
  related_terms TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  meta_description TEXT
);

-- Índices para performance
CREATE INDEX idx_encyclopedia_terms_new_category ON encyclopedia_terms_new(category);
CREATE INDEX idx_encyclopedia_terms_new_slug ON encyclopedia_terms_new(slug);
CREATE INDEX idx_encyclopedia_terms_new_active ON encyclopedia_terms_new(is_active);
CREATE INDEX idx_encyclopedia_terms_new_term ON encyclopedia_terms_new(term);
CREATE INDEX idx_encyclopedia_terms_new_related ON encyclopedia_terms_new USING GIN(related_terms);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_encyclopedia_terms_new_updated_at 
    BEFORE UPDATE ON encyclopedia_terms_new 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
    `);
    
    console.log('\n🌐 Acesse: https://supabase.com/dashboard/project/gbcmqlkoxzcszkaowcgu/sql/new');
    console.log('\n⚠️  Após criar a tabela, execute: node scripts/populate-encyclopedia-from-md.cjs');
    
    return false;

  } catch (error) {
    console.error('❌ Erro ao verificar tabela:', error);
    return false;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createTable().then(success => {
    if (success) {
      console.log('\n🎉 Tabela verificada com sucesso!');
    } else {
      console.log('\n⚠️  Ação manual necessária');
    }
  });
}

module.exports = { createTable }; 