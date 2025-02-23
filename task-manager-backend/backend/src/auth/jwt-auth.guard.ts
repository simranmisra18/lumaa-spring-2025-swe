import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            console.error("JWT Authentication Failed:", info); // DEBUG LOG
            return null; // Ensures unauthorized users aren't passed
        }
        return user;
    }
}
