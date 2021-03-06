import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from '@routes/app-routing.service';
import {AppRouterData} from '@routes/AppRouterData';
import {AuthService} from '@shared/auth.service';
import {CONSTANTS} from '@shared/config/constants';
import {AppScrollService} from '@shared/services/app-scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  signPage: boolean = false;

  constructor(
    private authService: AuthService,
    private routingService: AppRoutingService,
    private scrollService: AppScrollService,
  ) { }

  ngOnInit(): void {
    // Получили состояние пользователя и его данные (типо как*)
    this.authService.getLoginState().subscribe( loginState => {
      this.isLogged = loginState? loginState : false;
    });

    // Следим за страницей на которой находимся
    this.routingService.getCurrentRouteData().subscribe( (data: AppRouterData) => {
      if (data.path){
        this.signPage = data.path.includes(CONSTANTS.APP.LOGIN) || data.path.includes(CONSTANTS.APP.REGISTRATION);
      }
    });
  }

  onSearch(str: string) {
    let queryParam;
    if (str && str.length > 0) {
      queryParam = {[CONSTANTS.QUERY.SEARCH]: str};
      this.routingService.goToLinkWithQuery(CONSTANTS.APP.MAIN, false, queryParam, true);
      this.scrollService.scrollToTop();
    } else {
      this.routingService.removeQueryParam(CONSTANTS.QUERY.SEARCH);
    }
  }
}
