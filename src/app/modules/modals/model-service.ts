import {Injectable}                            from '@angular/core';
import {ICompany}                              from '../company/interfaces/i-company';
import {ModalIdEnum}                           from './enums/modal-id-enum';
import {IOwnCompanyModalComponent}             from './interfaces/i-own-company-modal-component';
import {IStackReviewModelComponent}            from './interfaces/i-stack-review-model-component';
import {IAddGroupModelComponent}               from './interfaces/i-add-group-config';
import {IReview}                               from '../review/interfaces/i-review';
import {IProtectedReviewDisplayModelComponent} from './interfaces/i-protected-review-display-model-component';
import {IWriteGroupReviewModelComponent}       from './interfaces/i-write-group-review-model-component';

@Injectable({providedIn: 'root'})
export class ModalService
{
    private modalsNew: Map<number, any> = new Map(); // @todo: change any with interface

    public register(id: number, modal: {}): void
    {
        this.modalsNew.set(id, modal);
    }

    private getModal<T>(id: number): T
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

    public openStackReviewModal(companyId: number): void
    {
        this.getModal<IStackReviewModelComponent>(ModalIdEnum.WRITE_GROUP_REVIEW).open(companyId);
    }

    public openAddGroupModel(groupId: number, companyId: number): void
    {
        this.getModal<IAddGroupModelComponent>(ModalIdEnum.ADD_GROUP).open(groupId, companyId);
    }

    public openAddGroupTechnologyModel(groupId: number, companyId: number): void
    {
        this.getModal<IAddGroupModelComponent>(ModalIdEnum.ADD_GROUP_TECHNOLOGY).open(groupId, companyId);
    }

    public openProtectedReview(review: IReview): void
    {
        this.getModal<IProtectedReviewDisplayModelComponent>(ModalIdEnum.PROTECTED_REVIEW_DISPLAY).open(review);
    }

    public openWriteGroupReviewModal(groupId: number): void
    {
        this.getModal<IWriteGroupReviewModelComponent>(ModalIdEnum.WRITE_GROUP_REVIEW).open(groupId);
    }
}
