import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, Subject, timer} from 'rxjs';
import {Person, ServerPerson} from '../../models/person';
import {concatMap, delay, map, mergeMap, retryWhen} from 'rxjs/operators';
import {ServerStarship, Starship} from '../../models/starship';
import {Planet, ServerPlanet} from '../../models/planet';
import {ErrorService} from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  private readonly API_PREFIX = 'https://swapi.dev/api';
  private readonly PERSON_ID_NUMBER_RANGE = 83;
  private readonly PLANET_ID_NUMBER_RANGE = 60;
  private readonly STARSHIP_ID_NUMBER_RANGE = 66;

  constructor(private httpClient: HttpClient) { }

  public getRandomPerson(): Observable<Person> {
    return of(`${this.API_PREFIX}/people/`)
      .pipe(concatMap((baseUrl: string) => this.httpClient.get(`${baseUrl}${randomNumberGenerator(this.PERSON_ID_NUMBER_RANGE)}/`)),
          map((res: ServerPerson) => {
            return new Person(res);
          }),
          retryWhen(this.retryWhenStrategy)
        );
  }

  public getRandomPlanet(): Observable<Planet> {
    return of(`${this.API_PREFIX}/planets/`)
      .pipe(concatMap((baseUrl: string) => this.httpClient.get(`${baseUrl}${randomNumberGenerator(this.PLANET_ID_NUMBER_RANGE)}/`)),
          map((res: ServerPlanet) => {
            return new Planet(res);
          }),
          retryWhen(this.retryWhenStrategy)
        );
  }

  public getRandomStarship(): Observable<Starship> {
    return of(`${this.API_PREFIX}/starships/`)
      .pipe(concatMap((baseUrl: string) => this.httpClient.get(`${baseUrl}${randomNumberGenerator(this.STARSHIP_ID_NUMBER_RANGE)}/`)),
            map((res: ServerStarship) => {
              return new Starship(res);
            }),
            retryWhen(this.retryWhenStrategy)
          );
  }

  private retryWhenStrategy(errors: Subject<any>): Observable<number>{
    return errors.pipe(
      mergeMap((error: HttpErrorResponse) => {
        if (error.status === 404) {
          ErrorService.retryLog('Will retry call in 100 ms');
          return timer(100);
        }
        ErrorService.handleServerError(error);
      })
    );
  }

}

function randomNumberGenerator(max: number, min: number = 1): number {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
