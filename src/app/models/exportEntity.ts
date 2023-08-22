export interface ExportEntity {
    // Table name
    name: string 

    // Table Primary key field - default=id
    primaryKeyField?: string;  

    // where clause restrictions against table ex ["color='blue'", "size > 10"]
    filters?: string[]; 

    // the columns to be in the export json - default=*
    exportFields?: "*" | string[];

    // Can be used in conjunction with exportFields='*' to take everything except certain fields
    excludedFields?: string[];
}