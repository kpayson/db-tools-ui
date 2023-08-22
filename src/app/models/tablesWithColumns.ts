export interface ColumnInfo {
    tableName: string;
    columnName: string;
    isNullable: string;
    dataType: string;
    columnType: string;
    columnKey: string;
    extra: string;
}

export interface TableWithColumnsInfo {
    tableName: string;
    columns: ColumnInfo[];
}

export interface TableInfo {
    tableName: string;
    rowCount: number;
}
