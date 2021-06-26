import {Component, Input} from '@angular/core';
import {IReview} from '../interfaces/i-review';

@Component({
  selector: 'app-display-small',
  templateUrl: './views/display-small.html',
  styleUrls: ['./styles/display-small.scss'],
})
export class DisplaySmallComponent {
  @Input() review: IReview;
}
