import { Test, TestingModule } from '@nestjs/testing';
import { MenuOptionController } from './menu-option.controller';

describe('MenuOptionController', () => {
  let controller: MenuOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuOptionController],
    }).compile();

    controller = module.get<MenuOptionController>(MenuOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
