import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '@footer/footer.component';
import {VisualComponentsModule} from '@components/visual-components/visual-components.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    VisualComponentsModule,
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})
export class FooterModule { }
