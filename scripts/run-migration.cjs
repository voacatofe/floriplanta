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
  
  // SQL para criar a tabela
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS encyclopedia_terms_new (
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
  `;

  const { error: tableError } = await supabase.rpc('exec_sql', { 
    sql_query: createTableSql 
  });

  if (tableError) {
    console.error('❌ Erro ao criar tabela:', tableError);
    return false;
  }

  console.log('✅ Tabela criada com sucesso');

  // Criar índices
  console.log('🔄 Criando índices...');
  
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_new_category ON encyclopedia_terms_new(category);',
    'CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_new_slug ON encyclopedia_terms_new(slug);',
    'CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_new_active ON encyclopedia_terms_new(is_active);',
    'CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_new_term ON encyclopedia_terms_new(term);',
    'CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_new_related ON encyclopedia_terms_new USING GIN(related_terms);'
  ];

  for (const indexSql of indexes) {
    const { error: indexError } = await supabase.rpc('exec_sql', { 
      sql_query: indexSql 
    });
    
    if (indexError && !indexError.message.includes('already exists')) {
      console.error('❌ Erro ao criar índice:', indexError);
    }
  }

  console.log('✅ Índices criados com sucesso');

  // Criar trigger para updated_at
  console.log('🔄 Criando trigger...');
  
  const triggerSql = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    DROP TRIGGER IF EXISTS update_encyclopedia_terms_new_updated_at ON encyclopedia_terms_new;
    
    CREATE TRIGGER update_encyclopedia_terms_new_updated_at 
        BEFORE UPDATE ON encyclopedia_terms_new 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
  `;

  const { error: triggerError } = await supabase.rpc('exec_sql', { 
    sql_query: triggerSql 
  });

  if (triggerError) {
    console.error('❌ Erro ao criar trigger:', triggerError);
  } else {
    console.log('✅ Trigger criado com sucesso');
  }

  return true;
}

// Executar se chamado diretamente
if (require.main === module) {
  createTable().then(success => {
    if (success) {
      console.log('\n🎉 Migração concluída com sucesso!');
      console.log('Agora você pode executar: node scripts/populate-encyclopedia-from-md.cjs');
    } else {
      console.log('\n❌ Migração falhou');
      process.exit(1);
    }
  });
}

module.exports = { createTable }; 