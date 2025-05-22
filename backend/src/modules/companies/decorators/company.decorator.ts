import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { IRequest } from "src/types";

export const Company = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: IRequest = ctx.switchToHttp().getRequest();
    return request.company;
  }
);
