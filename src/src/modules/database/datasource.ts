import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const { PGHOST, PGDATABASE, PGPASSWORD, PGUSER } = process.env;

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: PGHOST,
  port: 5432,
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  entities: [join(__dirname, '../**/*entity{.ts,.js}')],
  migrationsTableName: 'migrations',
  logging: true,
  migrations: [join(__dirname, '../migration/*{.ts,.js}')],
  migrationsRun: false,
  synchronize: false,

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
export const connectDb = new DataSource(datasourceOptions);
connectDb
  .initialize()
  .then((data) => console.log('Datasource Intitatilised!!!'))
  .catch((e) => console.log(e));
