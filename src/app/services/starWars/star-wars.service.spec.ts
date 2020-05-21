import { StarWarsService } from './star-wars.service';
import {ServerPerson} from '../../models/person';
import {of, throwError} from 'rxjs';
import {fakeAsync, tick} from '@angular/core/testing';
import {ErrorService} from '../error/error.service';
import {ServerPlanet} from '../../models/planet';
import {ServerStarship} from '../../models/starship';

describe('StarWarsService', () => {
  let service: StarWarsService;
  let httpClient;
  let retryWhenStrategy;
  const mockedPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/'
  };
  const mockedPlanet = {
    name: 'Yavin IV',
    rotation_period: '24',
    orbital_period: '4818',
    diameter: '10200',
    climate: 'temperate, tropical',
    gravity: '1 standard',
    terrain: 'jungle, rainforests',
    surface_water: '8',
    population: '1000',
    residents: []
  };
  const mockedStarship = {
    name: 'Death Star',
    model: 'DS-1 Orbital Battle Station',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000',
    length: '120000',
    max_atmosphering_speed: 'n/a',
    crew: '342,953',
    passengers: '843,342',
    cargo_capacity: '1000000000000',
    consumables: '3 years',
    hyperdrive_rating: '4.0',
    MGLT: '10',
    starship_class: 'Deep Space Mobile Battlestation',
    pilots: [],
  };
  beforeEach(() => {
    httpClient = {};
    service = new StarWarsService(httpClient);
    retryWhenStrategy = spyOn<any>(service, 'retryWhenStrategy').and.callThrough();
    ErrorService.handleServerError = jasmine.createSpy('handleServerError');
    ErrorService.retryLog = jasmine.createSpy('retryLog');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRandomPerson', () => {
    it('should return Person instance', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedPerson as ServerPerson));
      service.getRandomPerson().subscribe(
        res => {
          expect(res.name).toBe(mockedPerson.name);
          expect(res.height).not.toBeNaN();
          expect(retryWhenStrategy).not.toHaveBeenCalled();
        }
      );
    });
    it('should call retry strategy once', () => {
      httpClient.get = jasmine.createSpy().and.throwError('');
      service.getRandomPerson().subscribe();
      expect(retryWhenStrategy).toHaveBeenCalled();
      expect(ErrorService.handleServerError).toHaveBeenCalledTimes(1);
    });
    it('should call retry strategy until 200 response', fakeAsync(() => {
      httpClient.get = jasmine.createSpy().and.returnValue(throwError({status: 404}));
      service.getRandomPerson().subscribe(res => {
        expect(res.name).toBe(mockedPerson.name);
        expect(res.height).not.toBeNaN();
      });
      tick(200);
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedPerson as ServerPerson));
      tick(100);
      expect(ErrorService.retryLog).toHaveBeenCalledTimes(3);
    }));
  });

  describe('#getRandomPlanet', () => {
    it('should return Planet instance', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedPlanet as ServerPlanet));
      service.getRandomPlanet().subscribe(
        res => {
          expect(res.name).toBe(mockedPlanet.name);
          expect(res.rotationPeriod).not.toBeNaN();
          expect(retryWhenStrategy).not.toHaveBeenCalled();
        }
      );
    });
    it('should call retry strategy once', () => {
      httpClient.get = jasmine.createSpy().and.throwError('');
      service.getRandomPlanet().subscribe();
      expect(retryWhenStrategy).toHaveBeenCalled();
      expect(ErrorService.handleServerError).toHaveBeenCalledTimes(1);
    });
    it('should call retry strategy until 200 response', fakeAsync(() => {
      httpClient.get = jasmine.createSpy().and.returnValue(throwError({status: 404}));
      service.getRandomPlanet().subscribe(res => {
        expect(res.name).toBe(mockedPlanet.name);
        expect(res.rotationPeriod).not.toBeNaN();
      });
      tick(200);
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedPlanet as ServerPlanet));
      tick(100);
      expect(ErrorService.retryLog).toHaveBeenCalledTimes(3);
    }));
  });

  describe('#getRandomStarship', () => {
    it('should return Starship instance', () => {
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedStarship as ServerStarship));
      service.getRandomStarship().subscribe(
        res => {
          expect(res.name).toBe(mockedStarship.name);
          expect(res.cargoCapacity).not.toBeNaN();
          expect(retryWhenStrategy).not.toHaveBeenCalled();
        }
      );
    });
    it('should call retry strategy once', () => {
      httpClient.get = jasmine.createSpy().and.throwError('');
      service.getRandomStarship().subscribe();
      expect(retryWhenStrategy).toHaveBeenCalled();
      expect(ErrorService.handleServerError).toHaveBeenCalledTimes(1);
    });
    it('should call retry strategy until 200 response', fakeAsync(() => {
      httpClient.get = jasmine.createSpy().and.returnValue(throwError({status: 404}));
      service.getRandomStarship().subscribe(res => {
        expect(res.name).toBe(mockedStarship.name);
        expect(res.cargoCapacity).not.toBeNaN();
      });
      tick(200);
      httpClient.get = jasmine.createSpy().and.returnValue(of(mockedStarship as ServerStarship));
      tick(100);
      expect(ErrorService.retryLog).toHaveBeenCalledTimes(3);
    }));
  });
});
