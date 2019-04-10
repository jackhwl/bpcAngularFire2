import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from 'src/app/core/models';
import { FormGroup } from '@angular/forms';

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

    // setForm(post: Blog, form: FormGroup){
    //   if (post && !post.content) {
    //       let contentRef = this.content$.$ref.child(post.id);
    //       contentRef.once('value')
    //           .then((snapshot) => {
    //               let contents = snapshot.val();
    //               post.content = contents.content;
    //               form.setValue({
    //                   title: post.title,
    //                   author: post.author,
    //                   content: post.content,
    //                   //enable: post.enable
    //               });
    //       });
    //   }
    // }

    getEditorModules() {
      const modules = {
          toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],

              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],

              ['clean'],                                         // remove formatting button
              ['link', 'image', 'video'],
              ['showHtml'] //https://codepen.io/anon/pen/ZyEjrQ
          ]
      };
      return modules;
  }
}
