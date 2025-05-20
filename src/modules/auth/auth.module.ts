import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { PrismaModule } from '@infra/database/prisma/helpers/prisma.module';
import { UserService } from '@modules/users/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'your-secret-key', // Substitua por uma chave secreta segura
      signOptions: { expiresIn: '1h' }, // Configuração do tempo de expiração do token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
