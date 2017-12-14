import { PhoneViewModel } from "./phone";

export class OrderViewModel {
    constructor(
      public phone : PhoneViewModel,
      public date : Date,
      public status : string,

    ) { } 
  }
