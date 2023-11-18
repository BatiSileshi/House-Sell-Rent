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
import { PicturesModule } from './modules/pictures/pictures.module';
import { Features } from './modules/features/features.entity';
import { Locations } from './modules/features/locations.entity';
import { Pictures } from './modules/pictures/pictures.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { Categories } from './modules/categories/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Users, Profiles, Houses, Features, Locations, Pictures, Categories],
      synchronize: true,
    }),
    
    UsersModule,
    FeaturesModule,
    HousesModule,
    ProfilesModule,
    PicturesModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
