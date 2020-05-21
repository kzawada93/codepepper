import { PersonCardComponent } from './person-card.component';
import {of} from 'rxjs';
import {ValidationService} from '../../services/validation/validation.service';
import {Person, ServerPerson} from '../../models/person';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let starWarsService;
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
  } as ServerPerson;
  beforeEach(() => {
    starWarsService = {
      getRandomPerson: jasmine.createSpy('getRandomPerson').and.returnValue(of(new Person(mockedPerson)))
    };
    component = new PersonCardComponent(starWarsService);
    component.score.emit = jasmine.createSpy('emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#draw', () => {
    it('should fetch data and call proper methods', () => {
      component.attribute = 'height';
      component.draw();
      expect(component.person.name).toEqual(mockedPerson.name);
      expect(component.currentAttribute).toBe(component.attribute);
      expect(component.score.emit).toHaveBeenCalledWith(172);
    });
    it('should fetch data and call proper methods when attribute is wrong', () => {
      component.attribute = 'test';
      component.draw();
      expect(component.person[component.attribute]).toBe('Unknown');
      expect(component.score.emit).toHaveBeenCalledWith(0);
    });
  });

});
