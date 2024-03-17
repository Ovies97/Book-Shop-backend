import { createParamDecorator } from "@nestjs/common";

export const GetUsers = createParamDecorator((data, req): any =>
{
    console.log(req.args)

    return req;
});