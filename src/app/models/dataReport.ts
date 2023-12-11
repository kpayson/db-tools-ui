
import { DataReportParameter } from "./dataReportParameter";
import { CustomView } from "./customView";

export interface DataReport {

      id: number;
    
      name: string;
    
      description: string;
    
      reportTemplate: string;

      customViewId: number;
    
      parameters: DataReportParameter[]
}
