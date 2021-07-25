import {Injectable} from '@angular/core';
import {GroupRepository} from '../repositories/group-repository';
import {Observable} from 'rxjs';
import {IResponseEntity} from '../../../interfaces/i-response-entity';

@Injectable()
export class GroupService {
  public constructor(private repository: GroupRepository) {
  }

  public create(updateData: {}): Observable<IResponseEntity<null>> {
    return this.repository.abstractPost(updateData);
  }
}
