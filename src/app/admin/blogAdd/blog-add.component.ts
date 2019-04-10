import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'add-blog',
    templateUrl: '/blog-add.component.html'
})

export class BlogAddComponent {
    editorForm: FormGroup;
    imgTitle: string;
    imageSRC: string;
    postTitle: string;
    postAuthor: string;
    content: string;
    post: Blog;
    editorStyle = {
      height: '400px',
      //width: '90vw',
      backgroundColor: '#fff'
    };
    modules: any;
    txtArea: HTMLTextAreaElement;

    constructor( private blogAdminSVC: BlogAdminService, private router: Router, private fb: FormBuilder ){}

    ngOnInit(){
      // console.log('this.parentId=');
      // console.log(this.parentId);
      this.editorForm = this.fb.group({
        title: ['', Validators.required],
        author: '',
        content: ['', Validators.required],
        //enable: ''
      });
      this.modules = this.blogAdminSVC.getEditorModules();
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

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }

    createPost() {
      if (this.editorForm.valid) {
        if (this.editorForm.dirty){
            const postItem = { ...this.post, ...this.editorForm.value};
            // console.log('menuItem=', menuItem);
            // console.log('this.singleMenu=', this.menu);
            // console.log('this.editorForm.value=', this.editorForm.value);
            this.blogAdminSVC.createPost(postItem);
            this.onSaveComplete();
        } else {
            this.onSaveComplete();
        }
    } else {
        console.log('Please correct the validation errors.');
    }


        // this.post =  {
        //   title:  this.postTitle,
        //   content:  this.content,
        //   imgTitle:  this.imgTitle,
        //   author: this.postAuthor,
        //   img:  this.imageSRC ? this.imageSRC.substring(23) : null
        // };
        // this.blogAdminSVC.createPost(this.post);
        // //alert(`${this.postTitle} added to posts`);
        // this.router.navigate(['/blog-admin']);
    }

    cancel() {
        this.router.navigate(['/blog-admin']);
    }

    onSaveComplete(): void {
      // Reset the form to clear the flags
      console.log('onSaveComplete');
      this.router.navigate(['/blog-admin']);
    }
  }
