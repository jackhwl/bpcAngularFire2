import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Misc } from '../../core/models';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']
})


export class AdminMenuComponent implements OnInit {
    editorForm: FormGroup;
    theUser: string;
    headerChoice: string = '';
    misc: Misc;
    editorStyle = {
        height: '200px',
        //width: '90vw',
        backgroundColor: '#fff'
    };
    config = {
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
    txtArea: HTMLTextAreaElement;

    //misc$: FirebaseObjectObservable<Misc>;
    
    constructor(  private menuAdminSVC: MenuAdminService, private menuSVC: MenuService, private userSVC: UserService, private router: Router ) {}

    ngOnInit(): void {
        this.editorForm = new FormGroup({
            editContent: new FormControl(),
            sourceContent: new FormControl(),
            quillEditor: new FormControl(),
        });
        this.menuSVC.setTopNav('admin', null);
        this.getMisc();
    }

    editorCreated(e) {
        let quill = e;
        this.txtArea = document.createElement('textarea');
        this.txtArea.setAttribute('formControlName', 'sourceContent');
        this.txtArea.style.cssText = "width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none"

        let htmlEditor = quill.addContainer('ql-custom');
        htmlEditor.appendChild(this.txtArea);
        this.txtArea.value = this.editorForm.controls.editContent.value;
        let customButton = document.querySelector('.ql-showHtml');
        customButton.addEventListener('click', () => {
            if (this.txtArea.style.display === '') {
                this.editorForm.controls.editContent.setValue(this.txtArea.value);
                //quill.pasteHTML(html);
            } else {
                this.txtArea.value = this.editorForm.controls.editContent.value;
            }
            this.txtArea.style.display = this.txtArea.style.display === 'none' ? '' : 'none'
        });
    }

    chooseMode(mode: string){
        const content = mode === 'header' ? this.misc.header.content : this.misc.footer.content; //this.menuSVC.misc.footer.content;
        this.editorForm.controls.editContent.setValue(content);
        this.headerChoice = mode;
    }

    updateMisc() {
        if (this.headerChoice) {
            this.menuAdminSVC.editMisc(this.headerChoice, this.txtArea.style.display === 'none' ? this.editorForm.controls.editContent.value : this.txtArea.value );
        }
        this.headerChoice = '';
    }

    getMisc(): any {
        this.menuSVC.getMisc().subscribe(data=> this.misc=data);
      }
    
    // logout(){
    //     this.userSVC.logout();
    //     this.router.navigate(['']);
    // }

    maxLength(e) {
        // console.log(e);
        // if(e.editor.getLength() > 10) {
        //     e.editor.deleteText(10, e.editor.getLength());
        // }

    }
 }