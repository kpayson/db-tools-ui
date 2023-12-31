import {
    argsToTemplate,
    moduleMetadata,
    type Meta,
    type StoryObj,
  } from '@storybook/angular';


import {DbConnectionUpsertDialogComponent} from './db-connection-upsert-dialog.component';
import { FormBuilder } from '@angular/forms';
import {DbConnectionsService} from '../db-connections.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';

const connectionServiceMock = {
    updateConnection: (connection: any) => {},
    addConnection: (connection: any) => {}
}

const meta: Meta<DbConnectionUpsertDialogComponent> = {
    title: 'Components/db-conection-upsert-dialog',
    component: DbConnectionUpsertDialogComponent,
    excludeStories: /.*Data$/,
    tags: ['connections dialog'],

    render: (args: DbConnectionUpsertDialogComponent) => ({
      props: {
        ...args,
      },
      template: `<app-db-connection-upsert-dialog ${argsToTemplate(
        args
      )}></app-db-connection-upsert-dialog>`,
    }),
  };
  
  export default meta;
  type Story = StoryObj<DbConnectionUpsertDialogComponent>;
  
  export const Edit: Story = {
    args: {},
    decorators: [
      moduleMetadata({
        imports: [ThirdPartyComponentsModule],
        declarations: [],
        providers: [
            {provide:FormBuilder},
            {provide:DynamicDialogRef},
            {provide:DynamicDialogConfig, useValue:{data: {mode:'edit'}}},
            {provide:DbConnectionsService, useValue: connectionServiceMock}
        ],
      }),
    ],
  };
  
