import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { User } from './user/entities/user.entity';
import { UserMiddleWare } from './user/user.middleware';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-206-8-52.compute-1.amazonaws.com',
      port: 5432,
      username: 'czkabudzqpkvto',
      password:
        '0ff78c554e8f295d55a73cae6cbf90ecfc94b4987aeaf38d2885929bbe1bb098',
      database: 'd8mca5gl44d76r',
      entities: [User, Post],
      synchronize: true,
    }),
    CommonModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
