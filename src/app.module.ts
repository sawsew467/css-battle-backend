import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { ImageComparisonController } from './modules/image-comparison/image-comparison.controller';
import { ImageComparisonService } from './modules/image-comparison/image-comparison.service';
import { QuestionsModule } from './modules/questions/questions.module';
import { RoomModule } from './modules/room/room.module';
import { UsersModule } from './modules/users/users.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ApiConfigService) => configService.postgresConfig,
            inject: [ApiConfigService]
        }),
        AuthModule,
        UsersModule,
        ScheduleModule.forRoot(),
        QuestionsModule,
        RoomModule
    ],
    controllers: [ImageComparisonController],
    providers: [ImageComparisonService]
})
export class AppModule {}
