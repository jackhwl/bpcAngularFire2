import { Injectable } from '@angular/core';
import { Menu, Misc } from '../models';
//import { AngularFire } from 'angularfire2';
//import { AngularFire } from 'angularfire2';
// // for auth    
// import {AngularFireAuthModule} from 'angularfire2/auth';
// // for database
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { FormGroup } from '@angular/forms';

//import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()

export class MenuService {
    topMenu: Menu[];
    subMenu: Menu[];
    currentMenu: Menu;
    currentSubMenu: Menu;
    content$: FirebaseObjectObservable<string>;
    misc$: Observable<Misc>;
    subMenu$: Observable<Menu>;
    menu$: Observable<Menu[]>;
    result: any;

    constructor(private db: AngularFireDatabase ) {
        this.misc$ = this.db.object('misc');
        this.content$ = this.db.object('content');
        this.subMenu$ = this.db.object('subMenu');
        this.menu$ = this.db.list('menu');
    }
    getNav(routeMenu: string, routeSubMenu: string = null){
        //const b1$ = this.db.list('menu', {query: {orderByChild: 'order'}})
        const nav$ = this.db.list('menu')
        .map(keys => keys
            .map(key => key));

        const sub$ = this.db.list('subMenu')
                    .map(subMenuKeys => subMenuKeys
                        .filter(subMenuKey => subMenuKey.name.toLowerCase() === 'join us')
                        //.map( subMenu => ({id: subMenu.id, name: subMenu.name, items: subMenu.items})))
                        .map( subMenu => subMenu.items))
                        .switchMap(items => this.db.list('menu', {query: {orderByChild: 'order'}})
                            //.filter(menu => menu.map(key=>key.enable))
                            .map(menu=>menu.map(key=>({name: key.name, item: items}) )))
        //                 //.map( key => key.map(a=>a))

        // const nav$ = this.db.list('menu')
        //             .map(keys => keys
        //                 .map(key => key));
        //let result;
        // forkJoin([sub$, nav$]).subscribe(results=> {
        //     results[0].items = results[1];
        //     this.result = results[0];

        // })
        // console.log(this.result);
        // , items: subNav$
        //             .filter(nav=> nav.id === menu.id)
        //             .map(item=>item.items)}))
        //             // this.menu$
                    // .map(keys => keys
                    //     .map(key => ({name: key.name, id: key.id, items: 


                        // this.db.list('subMenu')
                        // .map(subMenuKeys => subMenuKeys
                        //     .filter(subMenuKey => subMenuKey.name.toLowerCase() === key.name.toLowerCase())
                        //     .map( subMenu => ({name: key.name, items: subMenu.items})
             .do(console.log);
            
             sub$.subscribe();
        //b$.subscribe();
    }

    setTopNav(routeMenu: string, routeSubMenu: string = null){
        if (!this.topMenu) {
            //let dbRef = this.menu$.$ref.orderByChild('order');
            let dbRef = this.db.list('menu', {query: {orderByChild: 'order'}}).$ref;
            dbRef.once('value')
                .then((snapshot) => {
                    let tmp: string[] = [];
                    snapshot.forEach(function(childSnapshot){
                        let item = childSnapshot.val();
                        if (item.enable) tmp.push(childSnapshot.val());
                    })
                    this.topMenu = Object.keys(tmp).map(key => tmp[key]);
                    //console.log(routeMenu);
                    if (routeMenu.toLowerCase() === 'admin') {
                        this.topMenu.forEach(m => {
                            this.getSubNav(m, null, false);
                        });
                    } else {
                        if (routeMenu.toLowerCase() === 'home' && this.topMenu[0].name.toLowerCase() !== 'home') routeMenu = this.topMenu[0].name.toLowerCase();                    
                        this.topMenu.forEach(m => {
                            if (m.name.toLowerCase() === routeMenu.toLowerCase().replace(/-/g, ' ')) {
                                this.currentMenu = m;
                                this.getSubNav(m, routeSubMenu, true);
                            } else {
                                this.getSubNav(m, routeSubMenu, false);
                            }
                        });
                    }
            });
        }
    } 

    getSubNav(menu: Menu, routeSubMenu: string = null, withContent: boolean = true) {
        if (!menu.items) {
          let dbRef = this.subMenu$.$ref.child(menu.id).child('items').orderByChild('order');
          //let dbRef = this.subMenu$.$ref.child(menu.id).child('items').orderByChild('order');
          dbRef.once('value')
              .then((snapshot) => {
                  let tmp: string[] = [];
                  snapshot.forEach(function(childSnapshot){
                      let item = childSnapshot.val();
                      if (item.enable) tmp.push(childSnapshot.val());
                  })
                  menu.items = Object.keys(tmp).map(key => tmp[key]);
                  this.subMenu = menu.items;
                  if (withContent) {
                    this.currentSubMenu = routeSubMenu ? this.subMenu.find(m=>m.name.toLowerCase() === routeSubMenu.toLowerCase().replace(/-/g, ' ')) : this.subMenu[0];
                    this.getContent(this.currentSubMenu ? this.currentSubMenu : menu);
                  }
          });
        } else {
            this.subMenu = menu.items;
        }
    }

    getContent(menu: Menu){
        if (menu && !menu.content) {
            let contentRef = this.content$.$ref.child(menu.id);
            contentRef.once('value')
                .then((snapshot) => {
                    let contents = snapshot.val();
                    menu.content = contents.content;
            });
        }
    }

    getMisc() {
        return this.misc$;
    }

    getMenus() {
        //this.setTopNav('home');
        //return Observable.of(this.topMenu);
        return this.menu$;
    }

    getTopNav(routeMenu: string, routeSubMenu: string = null){
        //if (!this.topMenu) {
            //let dbRef = this.menu$.$ref.orderByChild('order');
            let dbRef = this.db.list('menu', {query: {orderByChild: 'order'}}).$ref;
            dbRef.once('value')
                .then((snapshot) => {
                    let tmp: string[] = [];
                    snapshot.forEach(function(childSnapshot){
                        let item = childSnapshot.val();
                        if (item.enable) tmp.push(childSnapshot.val());
                    })
                    this.menu$ = Observable.of(Object.keys(tmp).map(key => tmp[key]));
                    //console.log(routeMenu);
                    if (routeMenu.toLowerCase() === 'admin') {
                        this.topMenu.forEach(m => {
                            this.getSubNav(m, null, false);
                        });
                    } else {
                        if (routeMenu.toLowerCase() === 'home' && this.topMenu[0].name.toLowerCase() !== 'home') routeMenu = this.topMenu[0].name.toLowerCase();                    
                        this.topMenu.forEach(m => {
                            if (m.name.toLowerCase() === routeMenu.toLowerCase().replace(/-/g, ' ')) {
                                this.currentMenu = m;
                                this.getSubNav(m, routeSubMenu, true);
                            } else {
                                this.getSubNav(m, routeSubMenu, false);
                            }
                        });
                    }
            });
        //}
    } 

  }

