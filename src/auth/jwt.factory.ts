import { ConfigService } from '@nestjs/config';

const JwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRATION_TIME'),
    },
  }),
  inject: [ConfigService],
};

export default JwtFactory;
