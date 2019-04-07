import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from './blog';

@Injectable()

export class BlogAdminService {
    createPost(post: Blog){
        if (post.img) {
          console.log(post);
          console.log('ddd111');
          let storageRef = firebase.storage().ref();
          storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
              .then((snapshot) => {
                  let url = snapshot.metadata.downloadURLs[0];
                  let dbRef = firebase.database().ref('blogPosts/');
                  let newPost = dbRef.push();
                  newPost.set ({
                      title: post.title,
                      content: post.content,
                      imgTitle: post.imgTitle,
                      img: url,
                      id: newPost.key
                  });
              })
              .catch((error) => {
                  alert(`failed upload: ${error}`);
              });
        } else {
          console.log('ddd111');
                    let dbRef = firebase.database().ref('blogPosts/');
          let newPost = dbRef.push();
          console.log('ddd');
          newPost.set ({
              title: post.title,
              content: post.content,
              imgTitle: post.imgTitle,
              img: null,
              id: newPost.key
          });

        }
    }

    editPost(update: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(update.id)
            .update({
                title: update.title,
                content: update.content
            });
        alert('post updated');
    }

    removePost(deletePost: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
                .then(function() {
                    alert(`${deletePost.imgTitle} was deleted from Storage`);
                }).catch(function(error) {
                    alert(`Error -Unable to delete ${deletePost.imgTitle}`);
                });
    }
}
