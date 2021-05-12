import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

import { AppInitService } from './app-init.service';
import { UserIdleModule } from "angular-user-idle";
import { IdleService } from './core/userIdle.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    DashboardModule,
    UserIdleModule.forRoot({ idle: 10, timeout: 30 }),
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [IdleService,AppInitService,{ provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppInitService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
