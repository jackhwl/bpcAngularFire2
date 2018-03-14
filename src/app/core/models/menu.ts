export class Menu {
    constructor(
        public name: string,
        public order: number,
        public enable: boolean,
        public id?: string,
        public items?: Menu[],
        public content?: string
    ){}

}