import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {StarWarsService} from '../../services/starWars/star-wars.service';
import {takeUntil} from 'rxjs/operators';
import {Planet} from '../../models/planet';
import {ValidationService} from '../../services/validation/validation.service';

@Component({
  selector: 'app-planet-card',
  templateUrl: './planet-card.component.html'
})
export class PlanetCardComponent implements OnDestroy {

  @Input('attribute') attribute: string;
  @Input() resultClass: string;
  @Input() additionalHeaderClasses: string;
  @Input() additionalBodyClasses: string;
  @Input() bodyText: string;
  @Output() score = new EventEmitter();
  public planet: Planet;
  public currentAttribute: string;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private starWarsService: StarWarsService) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public draw(): void {
    this.getPlanet();
  }

  private emitScore(): void {
    if (ValidationService.validateNumberAttribute(this.planet, this.currentAttribute)){
      this.score.emit(this.planet[this.currentAttribute]);
    } else {
      this.planet[this.currentAttribute] = 'Unknown';
      this.score.emit(0);
    }
  }

  private getPlanet(): void {
    this.starWarsService.getRandomPlanet()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: Planet) => {
          this.planet = res;
          this.currentAttribute = this.attribute;
          this.emitScore();
        }
      );
  }

}
