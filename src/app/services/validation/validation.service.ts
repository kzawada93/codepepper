import { Injectable } from '@angular/core';
import {Person} from '../../models/person';
import {Planet} from '../../models/planet';
import {Starship} from '../../models/starship';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public static validateNumberAttribute(entity: Person | Planet | Starship, attrName: string): boolean {
      return entity !== undefined && entity !== null
              && entity[attrName] !== undefined && entity[attrName] !== null
              && !isNaN(entity[attrName]);
  }

  constructor() { }
}
