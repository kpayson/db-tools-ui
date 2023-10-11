import { CommandTemplateParameter } from './commandTemplateParameter';

export interface CommandTemplate {

      id: number;
    
      name: string;
    
      template: string;
    
      resultLocationType: 'terminal' | 'file';
    
      resultFilePath: string;
    
      parameters: CommandTemplateParameter[]
}