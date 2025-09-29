import { Test, TestingModule } from '@nestjs/testing';
import { OutServiceService } from './out-service.service';

describe('OutServiceService', () => {
  let service: OutServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutServiceService],
    }).compile();

    service = module.get<OutServiceService>(OutServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
