import { StarshipCardComponent } from './starship-card.component';
import {of} from 'rxjs';
import {ServerStarship, Starship} from '../../models/starship';

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let starWarsService;
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
  } as ServerStarship;
  beforeEach(() => {
    starWarsService = {
      getRandomStarship: jasmine.createSpy('getRandomStarship').and.returnValue(of(new Starship(mockedStarship)))
    };
    component = new StarshipCardComponent(starWarsService);
    component.score.emit = jasmine.createSpy('emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#draw', () => {
    it('should fetch data and call proper methods', () => {
      component.attribute = 'length';
      component.draw();
      expect(component.starship.name).toEqual(mockedStarship.name);
      expect(component.currentAttribute).toBe(component.attribute);
      expect(component.score.emit).toHaveBeenCalledWith(120000);
    });
    it('should fetch data and call proper methods when attribute is wrong', () => {
      component.attribute = 'test';
      component.draw();
      expect(component.starship[component.attribute]).toBe('Unknown');
      expect(component.score.emit).toHaveBeenCalledWith(0);
    });
  });
});
