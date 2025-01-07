import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data === 'id') {
      // اول id رو چک میکنیم، اگر نبود سراغ sub میریم
      const userId = user?.id || user?.sub;
      if (!userId) {
        throw new BadRequestException('شناسه کاربر یافت نشد');
      }
      return userId;
    }

    return data ? user?.[data] : user;
  },
);
