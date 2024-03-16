import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserSchema } from './users/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import mainConfig from './config/main.config';
import { AuthModule } from './auth/auth.module';
import oauthConfig from './config/oauth.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${dbConfig().dbHost}:${dbConfig().dbPort}/${
        dbConfig().dbName
      }`,
      // `mongodb://username:password@host:port/database`,
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, mainConfig, oauthConfig, jwtConfig],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
