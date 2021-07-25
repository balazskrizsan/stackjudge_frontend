import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http-service';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';

@Injectable()
export class GroupRepository extends AbstractApiRepository {
  public constructor(httpService: HttpService) {
    super(httpService);
  }

  public getController(): string {
    return 'group';
  }
}
