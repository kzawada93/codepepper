import {FIGHT_TYPE, FightComponent} from './fight.component';
import {Person} from '../../models/person';
import {PersonCardComponent} from '../person-card/person-card.component';
import {StarWarsService} from '../../services/starWars/star-wars.service';
import {of} from 'rxjs';
import {Planet} from '../../models/planet';
import {Starship} from '../../models/starship';

describe('FightComponent', () => {
  let component: FightComponent;
  beforeEach(() => {
    component = new FightComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#constructor', () => {
    expect(component.selectedFightType).toBe('PERSON');
    expect(component.attributeTypes).toEqual(Person.getComparableParams());
    expect(component.selectedAttributeType).toBe(component.attributeTypes[0].param);
  });

  describe('#setScore', () => {
    it('shouldnt set winner', () => {
      component.setScore(12, '1');
      expect(component.winner).toBeNull();
    });
    it('should set DRAW', () => {
      component.setScore(12, '1');
      component.setScore(12, '2');
      expect(component.winner).toBe('DRAW');
    });
    it('should set Player1 as a winner', () => {
      component.setScore(13, '1');
      component.setScore(12, '2');
      expect(component.winner).toBe('PLAYER1');
    });
    it('should set Player2 as a winner', () => {
      component.setScore(-2, '1');
      component.setScore(0, '2');
      expect(component.winner).toBe('PLAYER2');
    });
  });

  describe('#performFight', () => {
    beforeEach(() => {
      const starWarsServiceMock = {} as StarWarsService;
      component.firstPlayerCard = new PersonCardComponent(starWarsServiceMock);
      component.secondPlayerCard = new PersonCardComponent(starWarsServiceMock);
      starWarsServiceMock.getRandomPerson = jasmine.createSpy('getRandomPerson')
        .and.returnValue(of());
    });

    it('should clear scores', () => {
      component.setScore(12, '1');
      component.setScore(13, '1');
      component.performFight();
      expect(component.winner).toBeNull();
    });
    it('should call drawing methods', () => {
      component.firstPlayerCard.draw = jasmine.createSpy('firstPlayerCardDraw');
      component.secondPlayerCard.draw = jasmine.createSpy('secondPlayerCardDraw');
      component.performFight();
      expect(component.firstPlayerCard.draw).toHaveBeenCalled();
      expect(component.secondPlayerCard.draw).toHaveBeenCalled();
    });
  });

  describe('#selectedFightTypeChange', () => {
    it('should set person comparable params', () => {
      component.selectedFightTypeChange(FIGHT_TYPE.PERSON);
      expect(component.attributeTypes).toEqual(Person.getComparableParams());
    });
    it('should set planet comparable params', () => {
      component.selectedFightTypeChange(FIGHT_TYPE.PLANET);
      expect(component.attributeTypes).toEqual(Planet.getComparableParams());
    });
    it('should set starship comparable params', () => {
      component.selectedFightTypeChange(FIGHT_TYPE.STARSHIP);
      expect(component.attributeTypes).toEqual(Starship.getComparableParams());
    });
  });
});
