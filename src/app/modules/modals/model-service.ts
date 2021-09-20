import {Injectable}                from '@angular/core';
import {IModal}                    from './interfaces/i-modal';
import {ICompany}                  from '../company/interfaces/i-company';
import {ModalIdEnum}               from './enums/modal-id-enum';
import {IOwnCompanyModalComponent} from './interfaces/i-own-company-modal-component';
import {IModalNew}                 from './interfaces/i-modal-new';

@Injectable({providedIn: 'root'})
export class ModalService
{
    private modals: IModal[]               = []; // @todo: move to a state class
    private modalsNew: Map<number, any> = new Map(); // @todo: fix with IModal

    public add(modal: IModal): void
    {
        this.modals.push(modal);
    }

    public addNew(id: number, modal: IModalNew): void
    {
        this.modalsNew.set(id, modal);
    }

    public open(id: number, config: {}): void
    {
        const modal = this.modals.find(m => m.id === id);

        if (!modal)
        {
            console.error('Modal not found with id#' + id);

            return;
        }

        modal.open(config);
    }

    public getModal<T>(id: number): T
    {
        if (!this.modalsNew.has(id))
        {
            console.error('Modal not found with id#' + id);

            return;
        }

        return this.modalsNew.get(id);
    }

    public openOwnCompany(company: ICompany): void
    {
        this.getModal<IOwnCompanyModalComponent>(ModalIdEnum.OWN_COMPANY).open(company);
    }
}
