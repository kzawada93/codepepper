import { PlanetCardComponent } from './planet-card.component';
import {of} from 'rxjs';
import {Planet, ServerPlanet} from '../../models/planet';

describe('PlanetCardComponent', () => {
  let component: PlanetCardComponent;
  let starWarsService;
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
  } as ServerPlanet;
  beforeEach(() => {
    starWarsService = {
      getRandomPlanet: jasmine.createSpy('getRandomPlanet').and.returnValue(of(new Planet(mockedPlanet)))
    };
    component = new PlanetCardComponent(starWarsService);
    component.score.emit = jasmine.createSpy('emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#draw', () => {
    it('should fetch data and call proper methods', () => {
      component.attribute = 'orbitalPeriod';
      component.draw();
      expect(component.planet.name).toEqual(mockedPlanet.name);
      expect(component.currentAttribute).toBe(component.attribute);
      expect(component.score.emit).toHaveBeenCalledWith(4818);
    });
    it('should fetch data and call proper methods when attribute is wrong', () => {
      component.attribute = 'test';
      component.draw();
      expect(component.planet[component.attribute]).toBe('Unknown');
      expect(component.score.emit).toHaveBeenCalledWith(0);
    });
  });
});
