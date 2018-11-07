import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemBlockComponent } from './news-item-block/news-item-block.component';
import { AdItemBlockComponent } from './ad-item-block/ad-item-block.component';
import { StatisticTableComponent } from './statistic-table/statistic-table.component';
import {NewsDataService} from '@shared/news-data.service';
import {TrimStringPipe} from '@shared/pipes/trim-string.pipe';
import {AppPipesModule} from '@shared/pipes/app-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AppPipesModule
  ],
  exports: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent
  ],
  declarations: [
    NewsItemBlockComponent,
    AdItemBlockComponent,
    StatisticTableComponent,
  ],
  providers: [
    NewsDataService,
  ]
})
export class BlockComponentsModule { }
