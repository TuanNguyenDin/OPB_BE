import { Test, TestingModule } from '@nestjs/testing';
import { ComboMenuController } from './combo_menu.controller';
import { ComboMenuService } from './combo_menu.service';

describe('ComboMenuController', () => {
  let controller: ComboMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComboMenuController],
      providers: [ComboMenuService],
    }).compile();

    controller = module.get<ComboMenuController>(ComboMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
