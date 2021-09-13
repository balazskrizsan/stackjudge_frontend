import {Component, OnInit}     from '@angular/core';
import {ActivatedRoute}        from '@angular/router';
import {Forms}                 from '../forms';
import {AddressForms}          from '../../address/address-forms';
import {OwnService}            from '../service/own-service';
import {FlashMessageService}   from '../../flash-message/services/flash-message-service';
import {FlashMessageLevelEnum} from '../../flash-message/enums/flash-message-level-enum';

@Component(
  {
      templateUrl: './../views/own-complete.html',
      styleUrls:   [],
      providers:   [Forms, AddressForms, OwnService],
  }
)
export class OwnCompleteActionComponent implements OnInit
{
    public constructor(
      private route: ActivatedRoute,
      private ownService: OwnService,
      private flashMessageService: FlashMessageService
    )
    {
    }

    async ngOnInit(): Promise<void>
    {
        const companyId: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        const code: string      = this.route.snapshot.paramMap.get('code');

        const res = await this.ownService.complete(companyId, code).toPromise();
        if (!res.success)
        {
            this.flashMessageService.push({
                messageLevel: FlashMessageLevelEnum.ERROR,
                message:      res.errorData,
                errorCode:    res.errorCode
            });
        }
    }
}
