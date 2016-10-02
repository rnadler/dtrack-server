import {Injectable} from "@angular/core";
import {MyHttpService} from "./myHttpService";
import {Headers, RequestOptions} from "@angular/http";


@Injectable()
export class LoginService {
    constructor(private myhttp: MyHttpService) { }

    login(username: String, password: String) {

        let request = 'username=' + username + '&password=' + password;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let options = new RequestOptions( {headers: headers} );

        return this.myhttp.post('/login', request, options)
            .map((res: any) =>  {
                localStorage.setItem('token', res.headers.get('XSRF-TOKEN'));
            });
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSignedIn(): boolean {
        return localStorage.getItem('token') !== null;
    }
}
