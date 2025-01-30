import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { UpdateMemberDto } from '../dto/UpdateMember.dto';

export const UpdateMemberSwagger = () => {
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: UpdateMemberDto,
    }),
  );
};
