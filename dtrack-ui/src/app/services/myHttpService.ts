import {Injectable} from "@angular/core";
import {RequestOptionsArgs, RequestOptions, Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";

const mergeAuthToken = (options: RequestOptionsArgs) => {
    let newOptions = new RequestOptions({}).merge(options);
    let newHeaders = new Headers(newOptions.headers);
    if (options === undefined) {
        newHeaders.append('Content-Type', 'application/json');
    }
    let token: string = (localStorage.getItem('token') === null) ? getCookie('XSRF-TOKEN') : localStorage.getItem('token');
    newHeaders.append('X-XSRF-TOKEN', token);
    newOptions.headers = newHeaders;
    return newOptions;
};

export function getCookie (tokenName: string) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + tokenName + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

@Injectable()
export class MyHttpService {

    constructor(public http: Http) {

    }

    get (url: string, options?: RequestOptionsArgs ): Observable <Response> {
        return this.http.get(url, mergeAuthToken(options));
    }

    post (url: string, body: string, options?: RequestOptionsArgs ): Observable <Response> {
        return this.http.post(url, body, mergeAuthToken(options));
    }
}
