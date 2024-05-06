import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { getJwtConfig } from '../config/jwt.config'
import { UserModule } from '../user/user.module'

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: getJwtConfig }),
    ],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
