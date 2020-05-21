import {Component, OnInit, ViewChild} from '@angular/core';
import {Person} from '../../models/person';
import {Starship} from '../../models/starship';
import {Planet} from '../../models/planet';
import {PersonCardComponent} from '../person-card/person-card.component';
import {PlanetCardComponent} from '../planet-card/planet-card.component';
import {StarshipCardComponent} from '../starship-card/starship-card.component';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent {

  @ViewChild('firstPlayerCard') firstPlayerCard: PersonCardComponent | PlanetCardComponent | StarshipCardComponent;
  @ViewChild('secondPlayerCard') secondPlayerCard: PersonCardComponent | PlanetCardComponent | StarshipCardComponent;

  public fightTypes: Array<FIGHT_TYPE> = Object.keys(FIGHT_TYPE) as FIGHT_TYPE[];
  public attributeTypes: Array<{name: string, param: string}>;
  public selectedFightType: FIGHT_TYPE;
  public selectedAttributeType: FIGHT_TYPE;
  public firstPlayerScore = 0;
  public secondPlayerScore = 0;
  public firstPlayerResultClass: string;
  public secondPlayerResultClass: string;
  public winner: WINNER_TYPE = null;
  public xhr: boolean;
  private scores: Map<string, number> = new Map();

  constructor() {
    this.selectedFightType = this.fightTypes[0];
    this.selectedFightTypeChange(this.selectedFightType);
    this.selectedAttributeType = this.attributeTypes[0].param as FIGHT_TYPE;
  }

  setScore(score: number, player: '1' | '2'): void {
    this.scores.set(player, score);
    this.checkResult();
  }

  performFight() {
    this.clearScoresMap();
    if (this.firstPlayerCard && this.secondPlayerCard){
      this.xhr = true;
      this.firstPlayerCard.draw();
      this.secondPlayerCard.draw();
    }
  }

  selectedFightTypeChange(newType: FIGHT_TYPE) {
    switch (newType) {
      case 'PERSON':
        this.attributeTypes = Person.getComparableParams();
        break;
      case 'PLANET':
        this.attributeTypes = Planet.getComparableParams();
        break;
      case 'STARSHIP':
        this.attributeTypes = Starship.getComparableParams();
        break;
    }
    this.selectedAttributeType = null;
  }

  private clearScoresMap(): void {
    this.scores.clear();
    this.winner = null;
  }

  private checkResult(): void {
    if (this.scores.has('1') && this.scores.has('2')) {
      if (this.scores.get('1') > this.scores.get('2')) {
        this.firstPlayerScore++;
        this.winner = WINNER_TYPE.PLAYER1;
      } else if (this.scores.get('1') < this.scores.get('2')) {
        this.secondPlayerScore++;
        this.winner = WINNER_TYPE.PLAYER2;
      } else {
        this.firstPlayerScore++;
        this.secondPlayerScore++;
        this.winner = WINNER_TYPE.DRAW;
      }
      this.xhr = false;
      this.setResultClasses();
    }
  }

  private setResultClasses() {
    switch (this.winner) {
      case WINNER_TYPE.DRAW:
        this.firstPlayerResultClass = null;
        this.secondPlayerResultClass = null;
        break;
      case WINNER_TYPE.PLAYER1:
        this.firstPlayerResultClass = 'winning';
        this.secondPlayerResultClass = 'loosing';
        break;
      case WINNER_TYPE.PLAYER2:
        this.firstPlayerResultClass = 'loosing';
        this.secondPlayerResultClass = 'winning';
        break;
    }
  }

}

export enum FIGHT_TYPE {
  PERSON = 'PERSON',
  PLANET = 'PLANET',
  STARSHIP = 'STARSHIP'
}

enum WINNER_TYPE {
  PLAYER1 = 'PLAYER1',
  PLAYER2 = 'PLAYER2',
  DRAW = 'DRAW'
}
