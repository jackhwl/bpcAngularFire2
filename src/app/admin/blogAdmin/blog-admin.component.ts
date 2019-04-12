import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: '/blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
  editorForm: FormGroup;
  theUser: string;
  menuChoice: string;
  blogPosts: Blog[];
  formDisplay: boolean = true;
  singlePost: Blog;
  editorStyle = {
    height: '400px',
    //width: '90vw',
    backgroundColor: '#fff'
  };
  modules: any;
  txtArea: HTMLTextAreaElement;

    constructor(private userSVC: UserService, private router: Router, private blogAdminSVC: BlogAdminService, private fb: FormBuilder){}

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;
    }

    ngOnInit(){
      this.editorForm = this.fb.group({
        title: ['', Validators.required],
        author: '',
        order: 100,
        enable: false,
        content: ['', Validators.required],
      });
      this.modules = this.blogAdminSVC.getEditorModules();
      this.theUser = this.userSVC.loggedInUser;
      this.getPosts();
    }

    editorCreated(e) {
      let quill = e;
      this.txtArea = document.createElement('textarea');
      this.txtArea.setAttribute('formControlName', 'content');
      this.txtArea.style.cssText = "width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none"

      let htmlEditor = quill.addContainer('ql-custom');
      htmlEditor.appendChild(this.txtArea);
      this.txtArea.value = this.editorForm.controls.content.value;
      let customButton = document.querySelector('.ql-showHtml');
      customButton.addEventListener('click', () => {
          if (this.txtArea.style.display === '') {
              this.editorForm.controls.content.setValue(this.txtArea.value);
              //quill.pasteHTML(html);
          } else {
              this.txtArea.value = this.editorForm.controls.content.value;
          }
          this.txtArea.style.display = this.txtArea.style.display === 'none' ? '' : 'none'
      });
    }

    maxLength(e) {
        // console.log(e);
        // if(e.editor.getLength() > 10) {
        //     e.editor.deleteText(10, e.editor.getLength());
        // }

    }

    getPosts(){
        let dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value')
            .then((snapshot) => {
                let tmp: string[] = snapshot.val();
                this.blogPosts = Object.keys(tmp).map(key => tmp[key])
            });
    }

    editPost(thePost: Blog) {
      console.log('aaa');
        this.singlePost = thePost;
        //this.blogAdminSVC.setForm(this.singlePost, this.editorForm);
        console.log('aaa2');
        this.editorForm.setValue({
          title: thePost.title,
          author: thePost.author ? thePost.author : '',
          content: thePost.content,
          enable: thePost.enable !== null ? thePost.enable : true,
          order: thePost.order ? thePost.order : 100
        });
        console.log('aaa3');
        this.formDisplay = false;
    }

    cancelEdit() {
        this.formDisplay = true;
    }

    updatePost(){
      if (this.editorForm.valid) {
        if (this.editorForm.dirty){
            const postItem = { ...this.singlePost, ...this.editorForm.value};
            console.log('postItem=', postItem);
            console.log('this.singlePost=', this.singlePost);
            console.log('this.editorForm.value=', this.editorForm.value);
            this.blogAdminSVC.editPost(postItem);
            this.formDisplay = true;
            this.getPosts();
            this.onSaveComplete();
        } else {
            this.onSaveComplete();
        }
      } else {
          console.log('Please correct the validation errors.');
      }
        // this.blogAdminSVC.editPost(single);
        // this.formDisplay = true;
    }

    deletePost(single: Blog){
        let verify = confirm(`Are you sure you want to delete this post?`);
        if (verify == true) {
            this.blogAdminSVC.removePost(single);
            this.router.navigate(['/blog-admin/']);
        } else {
            alert('Nothing deleted!');
        }
    }

    onSaveComplete(): void {
      // Reset the form to clear the flags
      console.log('onSaveComplete');
      this.editorForm.reset();
      this.router.navigate(['/admin/blog-admin']);
    }
}
