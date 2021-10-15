import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { I18nService } from '@app/i18n';
import { CredentialsService, Role } from './auth';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private credentialsService: CredentialsService
  ) {}

  checkRole() {
    const credentials = this.credentialsService.credentials;
    if (!credentials) {
      this.router.navigate(['/movies'], { replaceUrl: true });
    } else {
      switch (credentials.role) {
        case Role.user:
          this.router.navigate(['/movies'], { replaceUrl: true });
          break;
        case Role.staff:
          this.router.navigate(['/staff'], { replaceUrl: true });
          break;
        case Role.admin:
          this.router.navigate(['/admin'], { replaceUrl: true });
          break;
      }
    }
  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        if (Object.keys(event).length === 0) {
          this.checkRole();
        }

        const title = event.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
    this.checkRole();
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
