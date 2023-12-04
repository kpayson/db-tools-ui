import { CustomViewParameter } from "./customViewParameter";

export interface CustomView {

      id: number;
    
      name: string;
    
      description: string;
    
      viewSql: string;
    
      parameters: CustomViewParameter[]
}
