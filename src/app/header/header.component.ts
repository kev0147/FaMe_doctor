import { Component, Input } from '@angular/core';
import { Doctor } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() doctor : Doctor | undefined;
}
