/**
 * Prisma Client Errors - Query Engine
 */
export enum PrismaClientError {
  /** Valor fornecido excede o tamanho permitido da coluna */
  VALUE_TOO_LONG = 'P2000',

  /** Registro não encontrado com a condição especificada */
  RECORD_NOT_FOUND = 'P2001',

  /** Violação de restrição de unicidade */
  UNIQUE_CONSTRAINT_FAILED = 'P2002',

  /** Violação de chave estrangeira */
  FOREIGN_KEY_CONSTRAINT_FAILED = 'P2003',

  /** Falha em alguma restrição no banco de dados */
  DATABASE_CONSTRAINT_FAILED = 'P2004',

  /** Valor inválido armazenado no campo do banco de dados */
  INVALID_STORED_VALUE = 'P2005',

  /** Valor fornecido inválido para o campo do modelo */
  INVALID_VALUE_PROVIDED = 'P2006',

  /** Erro de validação de dados */
  DATA_VALIDATION_ERROR = 'P2007',

  /** Erro ao interpretar a query */
  QUERY_PARSING_ERROR = 'P2008',

  /** Erro ao validar a query */
  QUERY_VALIDATION_ERROR = 'P2009',

  /** Falha em query bruta */
  RAW_QUERY_FAILED = 'P2010',

  /** Violação de restrição NOT NULL */
  NULL_CONSTRAINT_VIOLATION = 'P2011',

  /** Valor obrigatório ausente */
  MISSING_REQUIRED_VALUE = 'P2012',

  /** Argumento obrigatório não fornecido */
  MISSING_REQUIRED_ARGUMENT = 'P2013',

  /** Violação de relação obrigatória entre modelos */
  REQUIRED_RELATION_VIOLATION = 'P2014',

  /** Registro relacionado não encontrado */
  RELATED_RECORD_NOT_FOUND = 'P2015',

  /** Erro ao interpretar a query */
  QUERY_INTERPRETATION_ERROR = 'P2016',

  /** Registros relacionados não estão conectados */
  RELATION_NOT_CONNECTED = 'P2017',

  /** Registros conectados obrigatórios não encontrados */
  REQUIRED_RECORDS_NOT_FOUND = 'P2018',

  /** Erro de entrada de dados */
  INPUT_ERROR = 'P2019',

  /** Valor fora do intervalo permitido */
  VALUE_OUT_OF_RANGE = 'P2020',

  /** Tabela não encontrada no banco de dados */
  TABLE_DOES_NOT_EXIST = 'P2021',

  /** Coluna não encontrada no banco de dados */
  COLUMN_DOES_NOT_EXIST = 'P2022',

  /** Dados inconsistentes na coluna */
  INCONSISTENT_COLUMN_DATA = 'P2023',

  /** Timeout ao buscar nova conexão do pool */
  CONNECTION_POOL_TIMEOUT = 'P2024',

  /** Operação falhou por depender de registros não encontrados */
  REQUIRED_RECORDS_NOT_FOUND_OPERATION_FAILED = 'P2025',

  /** Funcionalidade não suportada pelo provedor do banco de dados */
  UNSUPPORTED_FEATURE = 'P2026',

  /** Erros múltiplos ocorreram durante execução da query */
  MULTIPLE_DATABASE_ERRORS = 'P2027',

  /** Erro da API de transações */
  TRANSACTION_API_ERROR = 'P2028',

  /** Limite de parâmetros da query excedido */
  QUERY_PARAMETER_LIMIT_EXCEEDED = 'P2029',

  /** Índice fulltext não encontrado para a busca */
  FULLTEXT_INDEX_NOT_FOUND = 'P2030',

  /** MongoDB precisa estar em replica set para usar transações */
  MONGODB_REPLICA_SET_REQUIRED = 'P2031',

  /** Número na query excede o limite de int64 */
  NUMBER_EXCEEDS_INT64 = 'P2033',

  /** Conflito de escrita ou deadlock em transação */
  TRANSACTION_CONFLICT_OR_DEADLOCK = 'P2034',

  /** Violação de asserção no banco de dados */
  DATABASE_ASSERTION_VIOLATION = 'P2035',

  /** Erro em conector externo */
  EXTERNAL_CONNECTOR_ERROR = 'P2036',

  /** Muitas conexões abertas no banco de dados */
  TOO_MANY_CONNECTIONS = 'P2037',
}
