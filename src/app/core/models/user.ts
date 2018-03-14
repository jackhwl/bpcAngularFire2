import { Injectable } from '@angular/core';

export class User {
    constructor(
        public userId: string,
        public userName: string,
        public roles: string[],
        public isAdmin: boolean
    ){}
}