export interface DBConnection {
    id?: number;
    name: string;
    dialect: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    authServer: string
}
