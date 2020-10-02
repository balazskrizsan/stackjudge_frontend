import {Injectable} from '@angular/core';
import {AbstractApiRepository} from '../../../repositories/abstract-api-repository';
import {HttpService} from '../../../services/http-service';

export abstract class CrudRepository extends AbstractApiRepository {
  protected constructor(httpService: HttpService) {
    super(httpService);
  }
}
