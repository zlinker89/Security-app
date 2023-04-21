import { Test, TestingModule } from '@nestjs/testing';
import { MenuOptionService } from './menu-option.service';

describe('MenuOptionService', () => {
  let service: MenuOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuOptionService],
    }).compile();

    service = module.get<MenuOptionService>(MenuOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
