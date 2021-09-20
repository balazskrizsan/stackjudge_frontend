import {ICompany}  from '../../company/interfaces/i-company';

export interface IOwnCompanyModalComponent
{
    open(company: ICompany): void;
}
