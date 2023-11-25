import { Test, TestingModule } from '@nestjs/testing';
import { ComboMenuService } from './combo_menu.service';

describe('ComboMenuService', () => {
  let service: ComboMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComboMenuService],
    }).compile();

    service = module.get<ComboMenuService>(ComboMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
