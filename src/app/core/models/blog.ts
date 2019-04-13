import { AuthenticationService } from '../services';

export interface Blog {
  title: string,
  content: string,
  author: string,
  order: number,
  enable?: boolean,
  createDate: Date,
  modifiedDate: Date,
  imgTitle?: string,
  img?: any,
  id?: string
}

// export class Blog {
//   constructor(
//       public title: string,
//       public content: string,
//       public imgTitle?: string,
//       public img?: any,
//       public id?: string
//   ){}

// }
