export interface DataReportParameter {
    id: number;

    dataReportId: number;

    name: string;

    // dataType: string;

    defaultValue: string;
}


// export class DataReportParameter extends Model {
//     @Column({
//         type: DataType.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       })
//       id: number;

//     @Column({
//         type:DataType.INTEGER,
//     })
//     @ForeignKey(() => DataReport)
//     dataReportId: number;

//     @Column({
//         type: DataType.STRING,
//     })
//     name: string;

//     // @Column({
//     //     type: DataType.STRING,
//     // })
//     // dataType: string;

//     @Column({
//         type: DataType.STRING,
//     })
//     defaultValue: string;
    

// }
