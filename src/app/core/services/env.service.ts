import { Injectable, OnInit } from '@angular/core';

import { Env } from '../models';

@Injectable()
export class EnvService {

  public env: Env = null;
  
  constructor() {this.init();}

  init() {
    if (this.env === null || this.env === undefined) {
        if(window) {
            this.env = new Env();
            this.env.html5Mode = window["__env"]["html5Mode"];
            this.env.hostname = window["__env"]["hostname"];
            this.env.apiUrl = window["__env"]["apiUrl"];
            this.env.host = window["__env"]["host"];
            this.env.enableDebug = window["__env"]["enableDebug"];
            this.env.enableSSL = window["__env"]["enableSSL"];
            this.env.autoResolveHost = window["__env"]["autoResolveHost"];
        } else {
            console.log('can not found the environment file, check the env.js exists in the scripts folder')
        }
    } 
  }
}