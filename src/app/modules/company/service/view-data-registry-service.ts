import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IViewDataRegistry} from '../interfaces/i-view-data-registry';

@Injectable()
export class ViewDataRegistryService {
  private data$ = new BehaviorSubject<IViewDataRegistry>({
    company: null,
    companyStatistic: null,
    companyGroups: null,
    companyReviews: null
  });

  next(data: IViewDataRegistry): void {
    this.data$.next(data);
  }

  get(): Observable<IViewDataRegistry> {
    return this.data$.asObservable();
  }
}
