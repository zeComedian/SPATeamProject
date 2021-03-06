import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {News} from '@shared/models/News';
import {AppStringService} from '@shared/services/app-string.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AppRoutingService} from '@routes/app-routing.service';
import {NewsDataService} from '@shared/news-data.service';
import {AppDialogService} from '@shared/services/app-dialog.service';
import {CONSTANTS} from '@shared/config/constants';

@Component({
  selector: 'app-news-big-block',
  templateUrl: './news-big-block.component.html',
  styleUrls: ['./news-big-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBigBlockComponent implements OnChanges {
  @Input() news: News;
  _textContent: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private stringService: AppStringService,
    private routingService: AppRoutingService,
    private dialogService: AppDialogService,
    private newsService: NewsDataService,
  ) {
    this._textContent = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('news') &&  changes['news'].currentValue) {
      this._textContent = this.news.getText();
      this._textContent = this.stringService.trimmString(this._textContent, 750);
      this._textContent = this.stringService.getAllBeforeTag(this._textContent, 'div');
    }
  }

  public get textContent(): SafeHtml {
    let string = this._textContent? this._textContent : '';
    return this._sanitizer.bypassSecurityTrustHtml(string);
  }
  public goToNews(event){
    let id: string = this.news.getId();
    this.routingService.goToNews(id);
  }
  public deleteNews(id: string) {
    this.dialogService.confirmDialog(CONSTANTS.MSG.CONFIRM_DEL_NEWS).toPromise().then((value: boolean) => {
      if (!value) { return; }
      this.newsService.deleteNews(id).then((result: boolean) => {
        if (!result){ return; }
        this.dialogService.showToastSuccess(CONSTANTS.MSG.NEWS_DEL);
      });
    });
  }
}
