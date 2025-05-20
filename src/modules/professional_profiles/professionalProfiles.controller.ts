import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProfessionalProfileService } from "./professionalProfiles.service";
import { ResponseSend } from "@modules/shared/responseSend";

@ApiTags('Professional Profile')
@Controller('professional-profile')
export class ProfessionalProfileController {
  constructor(private readonly professionalProfileService: ProfessionalProfileService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async findManyProfiles() {
    const result = await this.professionalProfileService.findManyProfiles();

    return ResponseSend(
      result,
      null,
      HttpStatus.OK
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findManyProfilesByMemberId(@Param('id') id: string) {
    const result = await this.professionalProfileService.findManyProfilesByMemberId(id);

    return ResponseSend(
      result,
      null,
      HttpStatus.OK
    );
  }
}