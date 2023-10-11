import { CommandTemplate } from "./commandTemplate";

export interface CommandRunResult {
    id: number;
    commandTemplateId: number;
    parametersJson: string;
    runTimeMilliseconds: number;
    runByUser: string;
    runDate: Date;
    comment: string;
    htmlReport: string;
    commandTemplate?: CommandTemplate;
}


