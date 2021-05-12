import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/services/auth.service';
import { UserIdleService, UserIdleConfig } from "angular-user-idle";
import { Observable } from 'rxjs';
import { IdleTimeoutDialogComponent } from './idlet-timeout-dialog/idlet-timeout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class IdleService {

    constructor(
        private userIdle: UserIdleService,private http: HttpClient,private authService: AuthService,private router: Router
      ,private dialog: MatDialog) {
    
      }
    
      ngOnInit(): void {
          this.intiateIdleTimeout();
      }
    
      public intiateIdleTimeout()
      {
        this.getJSON().subscribe(data => {
          let UserIdleCon: UserIdleConfig = new UserIdleConfig();
        
          UserIdleCon.idle = Number(data["idlePeriod"]);
        
          UserIdleCon.timeout = Number(data["idleTimeout"]);
        
          this.userIdle.setConfigValues(UserIdleCon);
        
          this.userIdle.startWatching();
        
          this.userIdle.onTimerStart().subscribe();
          // Start watch when time is up.
          this.userIdle.onTimeout().subscribe(() => {
            if(!this.authService.getRememberMe() && !this.router.url.includes("/login"))
        {
          console.log("Idle time out");
            this.showDialog().subscribe((res) => {this.restart();  if(res) this.logout();} )
        }else
        {
          this.restart();
        }
            
          });
        
         });
      }
    showDialog(): Observable<boolean> {
        const editingDialog = this.dialog.open(IdleTimeoutDialogComponent);

      return editingDialog.afterClosed();
    }
    
      stop() {
        this.userIdle.stopTimer();
      }
    
      stopWatching() {
        this.userIdle.stopWatching();
      }
    
      startWatching() {
        this.userIdle.startWatching();
      }
    
      restart() {
        this.userIdle.resetTimer();
      }
      
      public getJSON(): Observable<any> {
        return this.http.get('assets/ConfigJson.json');
      }
    
      logout() {
        this.authService.logout()
          .subscribe(() => {
            this.router.navigate([this.authService.LOGIN_PATH]);
          });
      }
      
}