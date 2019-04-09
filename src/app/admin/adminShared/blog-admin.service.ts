import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from 'src/app/core/models';

@Injectable()

export class BlogAdminService {
    createPost(post: Blog){
        if (post.img) {
          let storageRef = firebase.storage().ref();
          storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
              .then((snapshot) => {
                  let url = snapshot.metadata.downloadURLs[0];
                  let dbRef = firebase.database().ref('blogPosts/');
                  let newPost = dbRef.push();
                  newPost.set ({
                      title: post.title,
                      author: post.author,
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
          let dbRef = firebase.database().ref('blogPosts/');
          let newPost = dbRef.push();
          newPost.set ({
              title: post.title,
              author: post.author,
              content: post.content,
              imgTitle: null,
              img: null,
              id: newPost.key
          });

        }
    }

    editPost(update: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(update.id)
            .update({
                title: update.title,
                author: update.author,
                content: update.content

            });
        //alert('post updated');
    }

    removePost(deletePost: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        console.log('post deleted');
        if (deletePost.imgTitle) {
          let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
              .delete()
                  .then(function() {
                      console.log(`${deletePost.imgTitle} was deleted from Storage`);
                  }).catch(function(error) {
                      console.log(`Error -Unable to delete ${deletePost.imgTitle}`);
                  });
        }
    }
}
