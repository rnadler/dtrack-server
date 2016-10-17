import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { LoginService } from './loginService';
import { Observable } from "rxjs";

@Injectable()
export class ActivateIfSignedIn implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.loginService.isSignedIn()) {
            this.router.navigate(['/']);
        }
        return this.loginService.isSignedIn();
    }
}
