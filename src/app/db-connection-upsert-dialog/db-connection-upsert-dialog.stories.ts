import {
    argsToTemplate,
    moduleMetadata,
    type Meta,
    type StoryObj,
  } from '@storybook/angular';

import { DbConnectionsComponent } from '../db-connections/db-connections.component';
import { FormBuilder } from '@angular/forms';
import {DbConnectionsService} from '../db-connections.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

const connectionServiceMock = {
    updateConnection: (connection: any) => {},
    addConnection: (connection: any) => {}
}

const meta: Meta<DbConnectionsComponent> = {
    title: 'Components/db-conection-upsert-dialog',
    component: DbConnectionsComponent,
    excludeStories: /.*Data$/,
    tags: ['connections dialog'],
    render: (args: DbConnectionsComponent) => ({
      props: {
        ...args,
      },
      template: `<app-db-connection-upsert-dialog ${argsToTemplate(
        args
      )}></app-db-connection-upsert-dialog>`,
    }),
  };
  
  export default meta;
  type Story = StoryObj<DbConnectionsComponent>;
  
  export const Default: Story = {
    args: {},
    decorators: [
      moduleMetadata({
        imports: [],
        declarations: [],
        providers: [
            {provide:FormBuilder},
            {provide:DynamicDialogRef},
            {provide:DynamicDialogConfig},
            {provide:DbConnectionsService, useValue: connectionServiceMock}
        ],
      }),
    ],
  };
  
