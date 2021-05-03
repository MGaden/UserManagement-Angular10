import { Observable, of } from 'rxjs';
import { AuthStrategy } from './auth.strategy';
import { Token } from '@models/token';
import { User } from '@models/user';

export class JwtAuthStrategy implements AuthStrategy<Token> {
  
  getCurrentUserClaims(): string[] {
    
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      let jsonToekn = JSON.parse(payload);
     return jsonToekn["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
     
    return undefined;

  }
  
  setRememberMe(rememberMe: boolean) {
    if(rememberMe)
    localStorage.setItem(this.Rem_Me, '1');
    else
    localStorage.removeItem(this.Rem_Me);
  }

  getRememberMe() : boolean
  {
    if(localStorage.getItem(this.Rem_Me) != undefined && localStorage.getItem(this.Rem_Me) == '1')
    return true;
    else
    {
      localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REF_TOKEN);
      return false;
    }
    
  }
 
  getRefreshTokenRequest(): any {
    return { token : this.getToken() , refreshToken : this.getRefreshToken()}
  }

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REF_TOKEN = 'REF_TOKEN';
  private readonly Rem_Me = 'Rem_Me';

  doLoginUser(token: Token): void {
    if(this.getRememberMe())
    {
      localStorage.setItem(this.JWT_TOKEN, token.token);
      localStorage.setItem(this.REF_TOKEN, token.refreshToken);
    }else
    {
      sessionStorage.setItem(this.JWT_TOKEN, token.token);
      sessionStorage.setItem(this.REF_TOKEN, token.refreshToken);
    }
    
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.Rem_Me);
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REF_TOKEN);
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.REF_TOKEN);
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      let jsonToekn = JSON.parse(payload);
      let user = { id: jsonToekn["uid"] , userName: jsonToekn["sub"] , email: jsonToekn["email"]  };
      return Observable.create( observer => {
        observer.next( user )
        observer.complete()
      });
    } else {
      return of(undefined);
    }
  }

  getToken() {
    if(this.getRememberMe())
    {
      return localStorage.getItem(this.JWT_TOKEN);
    }else{
      return sessionStorage.getItem(this.JWT_TOKEN);
    }
    
  }

  getRefreshToken() {
    if(this.getRememberMe())
    {
      return localStorage.getItem(this.REF_TOKEN);
    }
    else
    {
      return sessionStorage.getItem(this.REF_TOKEN);
    }
    
  }

}
