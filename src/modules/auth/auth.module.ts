import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Substitua por uma chave secreta segura
      signOptions: { expiresIn: '1h' }, // Configuração do tempo de expiração do token
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }