-- Script de migração para simplificar a estrutura da enciclopédia
-- De 3 tabelas para 1 tabela com related_terms como array

-- 1. Criar nova tabela com estrutura simplificada
CREATE TABLE encyclopedia_terms_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  definition TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Saúde', 'Química', 'Legislação')),
  related_terms TEXT[] DEFAULT '{}', -- Array de nomes de termos relacionados
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  meta_description TEXT
);

-- 2. Migrar dados da tabela antiga (se existir)
-- Inserir termos básicos primeiro
INSERT INTO encyclopedia_terms_new (id, term, slug, definition, category, created_at, updated_at, is_active, meta_description)
SELECT 
  id, 
  term, 
  slug, 
  definition, 
  category, 
  created_at, 
  updated_at, 
  is_active, 
  meta_description
FROM encyclopedia_terms
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'encyclopedia_terms');

-- 3. Migrar relacionamentos para array (se a tabela de relacionamentos existir)
-- Esta query agrupa os relacionamentos por termo e cria um array
UPDATE encyclopedia_terms_new 
SET related_terms = (
  SELECT ARRAY_AGG(et.term)
  FROM encyclopedia_relationships er
  JOIN encyclopedia_terms et ON er.related_term_id = et.id
  WHERE er.term_id = encyclopedia_terms_new.id
  AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'encyclopedia_relationships')
)
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'encyclopedia_relationships');

-- 4. Remover tabelas antigas (CUIDADO: isso apaga os dados!)
-- Descomente apenas após confirmar que a migração funcionou
-- DROP TABLE IF EXISTS encyclopedia_synonyms;
-- DROP TABLE IF EXISTS encyclopedia_relationships;
-- DROP TABLE IF EXISTS encyclopedia_terms;

-- 5. Renomear nova tabela
-- ALTER TABLE encyclopedia_terms_new RENAME TO encyclopedia_terms;

-- 6. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_category ON encyclopedia_terms_new(category);
CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_slug ON encyclopedia_terms_new(slug);
CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_active ON encyclopedia_terms_new(is_active);
CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_term ON encyclopedia_terms_new(term);

-- 7. Criar índice GIN para busca em related_terms
CREATE INDEX IF NOT EXISTS idx_encyclopedia_terms_related ON encyclopedia_terms_new USING GIN(related_terms);

-- 8. Adicionar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_encyclopedia_terms_updated_at 
    BEFORE UPDATE ON encyclopedia_terms_new 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Função para buscar termos relacionados (opcional, pode ser feito no código)
CREATE OR REPLACE FUNCTION get_related_terms(term_names TEXT[])
RETURNS TABLE(
  id UUID,
  term VARCHAR(255),
  slug VARCHAR(255),
  definition TEXT,
  category VARCHAR(50),
  related_terms TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    et.id,
    et.term,
    et.slug,
    et.definition,
    et.category,
    et.related_terms
  FROM encyclopedia_terms_new et
  WHERE et.term = ANY(term_names)
    AND et.is_active = TRUE
  ORDER BY et.term;
END;
$$ LANGUAGE plpgsql;

-- Comentários sobre a nova estrutura:
-- 
-- VANTAGENS:
-- 1. Muito mais simples - apenas 1 tabela
-- 2. Queries mais rápidas - sem JOINs
-- 3. Fácil de popular e manter
-- 4. related_terms como array simples de strings
-- 5. Busca por relacionamentos usando operadores de array do PostgreSQL
--
-- COMO USAR:
-- 1. Inserir termo: related_terms = ['THC', 'CBD', 'Receptor CB1']
-- 2. Buscar relacionados: WHERE term = ANY(array_de_nomes)
-- 3. Verificar se termo tem relacionamento: WHERE 'THC' = ANY(related_terms)
--
-- EXEMPLO DE USO:
-- INSERT INTO encyclopedia_terms_new (term, slug, definition, category, related_terms)
-- VALUES (
--   'Analgésico',
--   'analgesico', 
--   'Substância ou medicamento capaz de reduzir ou eliminar a dor...',
--   'Saúde',
--   ARRAY['THC', 'Dronabinol', 'Nabilona', 'K2/Spice', 'Receptor CB1']
-- ); 