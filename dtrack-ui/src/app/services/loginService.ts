import {Injectable} from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';
import {MyHttpService, getCookie} from "./myHttpService";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class LoginService {
    constructor(private myhttp: MyHttpService, private router: Router) { }

    login(username: string, password: string) {

        let request = 'username=' + username + '&password=' + password;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let options = new RequestOptions( {headers: headers} );

        return this.myhttp.post('/api/login', request, options)
            .map((res: any) =>  {
                let xsrf = getCookie('XSRF-TOKEN');
                console.log('LoginService: username=' + username + ' xsrf-token=' + xsrf);
                localStorage.setItem('token', xsrf);
                localStorage.setItem('user', username);
            });
    }
    getUser() {
        return localStorage.getItem('user');
    }
    successLogout() {
        this.logout('logout');
    }
    errorLogout() {
        this.logout('error');
    }
    logout(param): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.goToLogin(param);
    }

    isSignedIn(): boolean {
        return localStorage.getItem('token') !== null;
    }
    private goToLogin(param) {
        let navigationExtras: NavigationExtras = {
            queryParams: { 'param': param }
        };
        this.router.navigate(['/login'], navigationExtras);
    }
}