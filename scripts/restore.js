const { exec } = require('child_process');
const { configDotenv } = require('dotenv');

configDotenv();

const isWindows = process.platform === 'win32';

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;

const restoreCommand = `${isWindows ? 'set PGPASSWORD=' + POSTGRES_PASSWORD : 'PGPASSWORD=' + POSTGRES_PASSWORD} psql -U ${POSTGRES_USER} -h ${POSTGRES_HOST} -d ${POSTGRES_DATABASE} -f backup.sql`;

exec(restoreCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao restaurar backup: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log('Banco de dados restaurado com sucesso!');
});
