import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public static handleServerError(err: HttpErrorResponse) {
    alert(`Server error! More info: ${err.message}`);
  }

  public static retryLog(message: string) {
    console.warn(message);
  }

  constructor() { }
}
