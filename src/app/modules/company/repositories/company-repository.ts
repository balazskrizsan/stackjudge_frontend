import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http-service';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';

@Injectable()
export class CompanyRepository extends AbstractApiRepository {
  constructor(httpService: HttpService) {
    super(httpService);
  }

  getController(): string {
    return 'company';
  }
}
