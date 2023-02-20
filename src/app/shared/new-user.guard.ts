import { User } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewUserGuard implements CanActivate {
    constructor(
        public userService: UserService,
        private router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.userService.getCurrentUser().snapshotChanges().pipe(
            map(changes => ({ ...changes.payload.data() } as User))
        ).subscribe(user => {
            if (user.isNew) {
                this.router.navigate(['profile']);
            }
        })

        return true;
    }
}
