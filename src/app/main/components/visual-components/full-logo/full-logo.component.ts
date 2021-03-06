import {Component, OnInit} from '@angular/core';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-full-logo',
  templateUrl: './full-logo.component.html',
  styleUrls: ['./full-logo.component.scss']
})
export class FullLogoComponent {
  title: string;
  mainLink: string;

  constructor() {
    this.title = CONSTANTS.APP.TITLE;
    this.mainLink = CONSTANTS.APP.MAIN;
  }
}
