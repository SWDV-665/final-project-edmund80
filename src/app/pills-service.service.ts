import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class PillsServiceService {
  
  items: any = [];

  private dataChangeSubject = new Subject<boolean>();

  baseURL = 'http://localhost:8080';
  dataChanged$: Observable<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello from pills data service');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  
  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/pills').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: any, _Response: any) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errorMsg: string;
    const err = error || '';
    errorMsg = error.message ? error.message : error.toString();
    return throwError(errorMsg);
  }

  removeItem(id: string) {
    console.log('#### Remove it - id =', id);
    this.http.delete(this.baseURL + '/api/pills/' + id).subscribe((res) => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(item: any) {
    this.http.post(this.baseURL + '/api/pills/', item).subscribe((res) => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item: { _id: any; quantity: number }) {

    console.log('Editing item = ', item);
    this.http.put(this.baseURL + '/api/pills/' + item._id, item).subscribe((res) => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
} 