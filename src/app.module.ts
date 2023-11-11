import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HousesModule } from './modules/houses/houses.module';
import { User } from './modules/users/user.entity';
import { Profile } from './modules/profiles/profiles.entity';
import { House } from './modules/houses/house.entity';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Profile, House],
      synchronize: true,
    }),
    
    UsersModule,
    HousesModule,
    ProfilesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
