import {CrudRepository} from './crud-repository.service';
import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http-service';

@Injectable()
export class CompanyRepository extends CrudRepository {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getController(): string {
    return 'company';
  }
}
