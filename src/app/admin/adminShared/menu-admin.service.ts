import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Menu } from '../../core/models/menu';

@Injectable()

export class MenuAdminService {
    createMenu(menu: Menu){
        let dbRef = firebase.database().ref('menu/');
        let newMenu = dbRef.push();
        newMenu.set ({
            name: menu.name,
            order: menu.order,
            enable: menu.enable,
            id: newMenu.key
        });

        let subMenuRef = firebase.database().ref('subMenu/');
        let newSubMenu = subMenuRef.child(newMenu.key);
        newSubMenu.set ({
            name: menu.name,
        });

        let contentRef = firebase.database().ref('content/');
        let content = contentRef.child(newMenu.key);
        if (menu.content) {
            content.set ({
                name: menu.name,
                content: menu.content
            });
        } else {
            content.set ({
                name: menu.name
            });
        }
    }

    editMenu(menu: Menu) {        
        let dbRef = firebase.database().ref('menu/').child(menu.id)
            .update({
                name: menu.name,
                order: menu.order,
                enable: menu.enable
            }, function(err) {
                if (err) {
                    console.error('error:', err);
                }
            }
        );

        let subMenuRef = firebase.database().ref('subMenu/');
        let newSubMenu = subMenuRef.child(menu.id);
        newSubMenu.update ({
            name: menu.name,
        });

        let contentRef = firebase.database().ref('content/');
        let content = contentRef.child(menu.id);
        if (menu.content) {
            content.update ({
                name: menu.name,
                content: menu.content
            });
        } else {
            content.update ({
                name: menu.name
            });
        }

        // var updates = {};
        // updates['menu/' + menu.id] = {name: menu.name,order: menu.order};
        // updates['subMenu/' + menu.id] = {name: menu.name};
        // updates['content/' + menu.id] = {name: menu.name};
        
        // firebase.database().ref().update(updates);
        
        //alert('menu updated');
    }

    // created: FireBase.ServerValue.TIMESTAMP

    removeMenu(deleteMenu: Menu) {
        let dbRef = firebase.database().ref('menu/').child(deleteMenu.id).remove();
        let subMenuChildRef = firebase.database().ref('subMenu/').child(deleteMenu.id).child('items');
        subMenuChildRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = [];
                snapshot.forEach(function(childSnapshot){
                    let item = childSnapshot.val();
                    tmp.push(childSnapshot.val());
                })
                let menuItems = Object.keys(tmp).map(key => tmp[key]);
                menuItems.forEach(m=>firebase.database().ref('content/').child(m.id).remove());
        });
        subMenuChildRef.remove();
        let subMenuRef = firebase.database().ref('subMenu/').child(deleteMenu.id).remove();

        let contentRef = firebase.database().ref('content/').child(deleteMenu.id).remove();

        //alert('menu deleted');
        // let imageRef = firebase.storage().ref().child(`images/${deleteMenu.imgTitle}`)
        //     .delete()
        //         .then(function() {
        //             alert(`${deleteMenu.imgTitle} was deleted from Storage`);
        //         }).catch(function(error) {
        //             alert(`Error -Unable to delete ${deleteMenu.imgTitle}`);
        //         });
    }

    createSubMenu(parentId: string, menu: Menu){
        let dbRef = firebase.database().ref('subMenu/').child(parentId).child('items');
        let newMenu = dbRef.push();
        newMenu.set ({
            name: menu.name,
            order: menu.order,
            enable: menu.enable,
            id: newMenu.key
        });
        
        // let subMenuRef = firebase.database().ref('subMenu/');
        // let newSubMenu = subMenuRef.child(menu.id);
        // newSubMenu.update ({
        //     name: menu.name,
        // });

        let contentRef = firebase.database().ref('content/');
        let content = contentRef.child(newMenu.key);
        content.update ({
            name: menu.name,
            content: menu.content
        });
    }

    editSubMenu(parentId: string, menu: Menu) {        
        let dbRef = firebase.database().ref('subMenu/').child(parentId).child('items').child(menu.id)
        //let dbRef = firebase.database().ref('menu/').child(menu.id)
            .update({
                name: menu.name,
                order: menu.order,
                enable: menu.enable
            }, function(err) {
                if (err) {
                    console.error('error:', err);
                }
            }
        );

        // let subMenuRef = firebase.database().ref('subMenu/');
        // let newSubMenu = subMenuRef.child(menu.id);
        // newSubMenu.update ({
        //     name: menu.name,
        // });

        let contentRef = firebase.database().ref('content/').child(menu.id);
        //let content = contentRef.child(menu.id);
        if (menu.content) {
            contentRef.update ({
                name: menu.name,
                content: menu.content
            });
        } else {
            contentRef.update ({
                name: menu.name
            });
        }

        // var updates = {};
        // updates['menu/' + menu.id] = {name: menu.name,order: menu.order};
        // updates['subMenu/' + menu.id] = {name: menu.name};
        // updates['content/' + menu.id] = {name: menu.name};
        
        // firebase.database().ref().update(updates);
        
        //alert('menu updated');
    }

    removeSubMenu(parentId: string, deleteMenu: Menu) {
        let subMenuRef = firebase.database().ref('subMenu/').child(parentId).child('items').child(deleteMenu.id).remove();
        let contentRef = firebase.database().ref('content/').child(deleteMenu.id).remove();
    }

    editMisc(type: string, content: string) {        
        let dbRef = firebase.database().ref('misc/' + type + '/')
            .update({
                content: content
            }, function(err) {
                if (err) {
                    console.error('error:', err);
                }
            }
        );
    }
}