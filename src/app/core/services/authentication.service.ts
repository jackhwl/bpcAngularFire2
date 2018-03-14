import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { EnvService } from './env.service';
import { CacheService } from './cache.service';
import { map, catchError } from 'rxjs/operators'
//import {_throw} from 'rxjs/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { DomSanitizer } from '@angular/platform-browser';

import { User } from '../models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  public user: User;
  
  constructor(public sanitizer: DomSanitizer, private cacheSvc: CacheService, private http: Http, public envSvc: EnvService) {
      this.user = new User(null, null, [], false);
  }

//   login() {
//     let url = this.envSvc.envSpecific.d3ApiUrl + '/GetCurrentUserJson';
//       // Only want to do this once - if root page is revisited, it calls this again.
//       if (this.user === null || this.user === undefined) {

//         return this.http.get(url)
//             .map((data) => data.json())
//             .toPromise<User>();
//       }

//       return Promise.resolve(this.userNull);
//   }
handleError0(err) {
    let errMessage: string;

    if (err instanceof Response) {
        let body = err.json() ? err.json() : err.toString();
        let error = body.error || JSON.stringify(body);
        errMessage = `aaaaa ${err.status} - ${err.statusText} || ''}`;// ${error}`;
    } else {
        errMessage = err.message ? err.message : err.toString();
    }

    return ErrorObservable.create(errMessage);
}
    
// http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
// https://stackoverflow.com/questions/34802210/angular-2-child-component-events-broadcast-to-parent/34807012
/**
 * Return user object (windows authentication)
 */

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

//   login(username: string, password: string) {
//     return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
//         .map((response: Response) => {
//             // login successful if there's a jwt token in the response
//             let user = response.json();
//             if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//             }
//         });
//     }

//   addUserToStorage() {
//     localStorage.setItem
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     let a = currentUser.token;
//     //$window.sessionStorage["user"] = JSON.stringify(user);
//   }

//   return $http.get(url).then(function (response) {
//       var result = response.data;
    
//       user = {
//           userId: result.userId,
//           userName: result.userName,
//           isAdmin: result.isAdmin
//       };

//       addUserToStorage();

//       console.log("user created.");
//       return $q.when(user);
//   });
//   public loginloadEnvironment() {
//       // Only want to do this once - if root page is revisited, it calls this again.
//       if (this.envSpecific === null || this.envSpecific === undefined) {

//         return this.http.get('./assets/env-specific.json')
//             .map((data) => data.json())
//             .toPromise<EnvSpecific>();
//       }

//       return Promise.resolve(this.envSpecificNull);
//   }

//   public setEnvSpecific(es: EnvSpecific) {
//     // This has already been set so bail out.

//     if (es === null || es === undefined) {
//         return;
//     }

//     es.host = es.autoResolveHost ? location.protocol.concat("//").concat(window.location.hostname) : ((es.enableSSL ? 'https://' : 'http://') + es.hostname);    
//     es.d3ApiUrl = es.host.concat("/").concat(es.d3Api);

//     this.envSpecific = es;
    
//     if (this.envSpecificSubject) {
//         this.envSpecificSubject.next(this.envSpecific);
//     }
//   }

//   /*
//     Call this if you want to know when EnvSpecific is set.
//   */
//   public subscribe(caller: any, callback: (caller: any, es: EnvSpecific) => void) {
//       this.envSpecificSubject
//           .subscribe((es) => {
//               if (es === null) {
//                   return;
//               }
//               callback(caller, es);
//           });
//   }
}