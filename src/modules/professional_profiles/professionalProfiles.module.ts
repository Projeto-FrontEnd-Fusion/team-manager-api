import { Module } from "@nestjs/common";

import { PrismaModule } from "@infra/database/prisma/helpers/prisma.module";
import { ProfessionalProfileController } from "./professionalProfiles.controller";
import { ProfessionalProfileService } from "./professionalProfiles.service";

@Module({
  imports: [PrismaModule],
  controllers: [ProfessionalProfileController],
  providers: [ProfessionalProfileService],
  exports: [ProfessionalProfileService]
})
export class ProfessionalProfileModule { };
