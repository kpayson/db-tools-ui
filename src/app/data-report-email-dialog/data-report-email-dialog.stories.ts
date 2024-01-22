import {
    argsToTemplate,
    moduleMetadata,
    type Meta,
    type StoryObj,
  } from '@storybook/angular';

import {DataReportEmailDialogComponent} from './data-report-email-dialog.component'
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';
import { ReactiveFormsModule } from '@angular/forms';

const meta: Meta<DataReportEmailDialogComponent> = {
    title: 'Components/app-data-report-email-dialog',
    component: DataReportEmailDialogComponent,
    excludeStories: /.*Data$/,
    tags: ['report email dialog'],

    render: (args: DataReportEmailDialogComponent) => ({
      props: {
        ...args,
      },
      template: `<app-data-report-email-dialog ${argsToTemplate(args)}></app-data-report-email-dialog>`,
    })

  };
  
  export default meta;
  type Story = StoryObj<DataReportEmailDialogComponent>;
  
  export const Edit: Story = {
    args: {},
    decorators: [
      moduleMetadata({
        imports: [ThirdPartyComponentsModule, ReactiveFormsModule],
        declarations: [],
        providers: [
            {provide:FormBuilder},
            {provide:DynamicDialogRef},
            {provide:DynamicDialogConfig, useValue:{data: {
                reportName:'Client Data Report',
                runDate:'2021-01-01',
                attachmentFileName:'ClientReport101'
            }}}
        ]
      })
    ]
  };
  



