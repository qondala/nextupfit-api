import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DetailsUserDto } from "@app/module/user/dto";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): DetailsUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    // If no data is provided, return the entire user object
    return data ? {...user} : user;
  },
);
