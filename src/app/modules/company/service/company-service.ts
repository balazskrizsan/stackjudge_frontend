import {AbstractCrudService} from '../../../services/abstract-crud-service';
import {Injectable} from '@angular/core';
import {ICompany} from '../interfaces/i-company';
import {CompanyRepository} from '../repositories/company-repository';

@Injectable()
export class CompanyService extends AbstractCrudService<ICompany, CompanyRepository> {
  public constructor(private repo: CompanyRepository) {
    super(repo);
  }
}
