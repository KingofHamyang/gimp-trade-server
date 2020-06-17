import { Test, TestingModule } from '@nestjs/testing';
import { MarginsController } from './margins.controller';

describe('Margins Controller', () => {
  let controller: MarginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarginsController],
    }).compile();

    controller = module.get<MarginsController>(MarginsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
