import { Test, TestingModule } from '@nestjs/testing';
import { GimpsController } from './gimps.controller';

describe('Gimps Controller', () => {
  let controller: GimpsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GimpsController],
    }).compile();

    controller = module.get<GimpsController>(GimpsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
