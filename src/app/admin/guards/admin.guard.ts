import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { permissions } from 'app/core/permission';

export class RouteGuardBase {

    permissionChecker: AuthService;

    constructor(_permissionChecker: AuthService) {
        this.permissionChecker = _permissionChecker
    }

    //used to redirect user for best permited url if he didn't have access to destination url
    selectBestRoute(): string {

        if (this.permissionChecker.isGranted(permissions.Default))
            return '/app/dashboard'

      //logout redirect
        return '/login'
    }
}


@Injectable({
  providedIn: 'root'
})
export class AdminGuard extends RouteGuardBase implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) { super(authService); }
    
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        
    var havePermission = this.canActivate(childRoute, state);
    
    return havePermission;

    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    //state.url ; for save previous url if needed to redirct on it after login
    if (!route.data || !route.data["permission"]) {
        return Observable.create( observer => {
            observer.next( true )
            observer.complete()
          });
    }

    if (this.authService.isGranted(route.data["permission"])) {
        return Observable.create( observer => {
            observer.next( true )
            observer.complete()
          });
    }

     this.canLoad();

    // if there is permission but not granted
    // then get another url
    this.router.navigate([this.selectBestRoute()]);

    return Observable.create( observer => {
        observer.next( false )
        observer.complete()
      });

  }

  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn$().pipe(
      tap(isLoggedIn => {

        if (!isLoggedIn) { this.router.navigate(['/login']); }
      })
    );
  }
}
