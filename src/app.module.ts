import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HousesModule } from './modules/houses/houses.module';
import { Users } from './modules/users/user.entity';
import { Profiles } from './modules/profiles/profiles.entity';
import { Houses } from './modules/houses/house.entity';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { FeaturesModule } from './modules/features/features.module';
import { LocationsModule } from './modules/locations/locations.module';
import { PicturesModule } from './modules/pictures/pictures.module';
import { Features } from './modules/features/features.entity';
import { Locations } from './modules/locations/locations.entity';
import { Pictures } from './modules/pictures/pictures.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Users, Profiles, Houses, Features, Locations, Pictures],
      synchronize: true,
    }),
    
    UsersModule,
    HousesModule,
    ProfilesModule,
    FeaturesModule,
    LocationsModule,
    PicturesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
