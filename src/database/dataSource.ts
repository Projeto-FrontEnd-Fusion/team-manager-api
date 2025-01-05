import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from 'src/config';

export const dataSourceConfig = () => {
  const uri =
    EnvConfig.ENVIRONMENT === 'production'
      ? EnvConfig.database.MONGO_URL_PRODUCTION
      : EnvConfig.database.MONGO_URL_DEVELOPMENT;

  return MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: uri
    }),
  });
};

