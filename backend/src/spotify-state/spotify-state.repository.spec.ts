import { Test, TestingModule } from '@nestjs/testing';
import { SpotifyStateService } from './spotify-state.service';

describe('SpotifyStateService', () => {
  let service: SpotifyStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotifyStateService],
    }).compile();

    service = module.get<SpotifyStateService>(SpotifyStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
