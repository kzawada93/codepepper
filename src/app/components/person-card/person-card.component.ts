import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Person} from '../../models/person';
import {StarWarsService} from '../../services/starWars/star-wars.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ValidationService} from '../../services/validation/validation.service';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html'
})
export class PersonCardComponent implements OnDestroy {

  @Input() attribute: string;
  @Input() resultClass: string;
  @Input() additionalHeaderClasses: string;
  @Input() additionalBodyClasses: string;
  @Input() bodyText: string;
  @Output() score = new EventEmitter();
  public person: Person;
  public currentAttribute: string;
  public isWinner: boolean;
  private ngUnsubscribe: Subject<any> = new Subject<number>();
  constructor(private starWarsService: StarWarsService) { }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public draw(): void {
    this.getPerson();
  }

  private emitScore(): void {
    if (ValidationService.validateNumberAttribute(this.person, this.attribute)){
      this.score.emit(this.person[this.attribute]);
    } else {
      this.person[this.attribute] = 'Unknown';
      this.score.emit(0);
    }
  }

  private getPerson(): void {
    this.starWarsService.getRandomPerson()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
      (res: Person) => {
        this.person = res;
        this.currentAttribute = this.attribute;
        this.emitScore();
      }
    );
  }
}
