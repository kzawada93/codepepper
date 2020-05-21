import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {StarWarsService} from '../../services/starWars/star-wars.service';
import {takeUntil} from 'rxjs/operators';
import {Starship} from '../../models/starship';
import {ValidationService} from '../../services/validation/validation.service';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html'
})
export class StarshipCardComponent implements OnDestroy {

  @Input('attribute') attribute: string;
  @Input() resultClass: string;
  @Input() additionalHeaderClasses: string;
  @Input() additionalBodyClasses: string;
  @Input() bodyText: string;
  @Output() score = new EventEmitter();
  public starship: Starship;
  public currentAttribute: string;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private starWarsService: StarWarsService) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public draw(): void {
    this.getPerson();
  }

  private emitScore(): void {
    if (ValidationService.validateNumberAttribute(this.starship, this.attribute)){
      this.score.emit(this.starship[this.attribute]);
    } else {
      this.starship[this.attribute] = 'Unknown';
      this.score.emit(0);
    }
  }

  private getPerson(): void {
    this.starWarsService.getRandomStarship()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: Starship) => {
          this.starship = res;
          this.currentAttribute = this.attribute;
          this.emitScore();
        }
      );
  }

}
