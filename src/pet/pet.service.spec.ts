import { Test, TestingModule } from '@nestjs/testing';
import { PetService } from './pet.service';
import { PetModule } from './pet.module';
import { MongoModule } from '../services/mongo/mongo.module';
import { Module } from '@nestjs/common';
import { PetsCollection } from '../services/mongo/collections/pets.collection';
import { PetType } from '../vendors/petfinder/pet-type.enum';
import { PetGender } from '../vendors/petfinder/pet-gender.enum';
import { PetfinderService } from '../vendors/petfinder/petfinder.service';

describe('PetService', () => {
  let service: PetService;
  const petfinderServiceMock = {
    getAnimals: jest.fn(),
  };

  @Module({
    providers: [
      {
        provide: PetsCollection,
        useValue: {},
      },
    ],
    exports: [PetsCollection],
  })
  class MongoModuleMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PetModule],
    })
      .overrideModule(MongoModule)
      .useModule(MongoModuleMock)
      .overrideProvider(PetfinderService)
      .useValue(petfinderServiceMock)
      .compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPetsListByType', () => {
    it('should call pet finder with the correct params', async () => {
      petfinderServiceMock.getAnimals.mockResolvedValueOnce({ animals: [] });
      service.getPetsList(PetType.Dog, PetGender.All);
      expect(petfinderServiceMock.getAnimals).toHaveBeenCalledWith(
        PetType.Dog,
        PetGender.All,
      );
    });
  });
});
