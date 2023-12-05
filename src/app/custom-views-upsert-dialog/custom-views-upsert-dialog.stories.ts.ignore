import {
    argsToTemplate,
    moduleMetadata,
    type Meta,
    type StoryObj,
  } from '@storybook/angular';


import { CustomViewsUpsertDialogComponent } from './custom-views-upsert-dialog.component';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';
import {CustomViewsStateService} from '../custom-views-state.service';

const connectionServiceMock = {
    updateConnection: (connection: any) => {},
    addConnection: (connection: any) => {}
}

const customViewsStateServiceMock = {
  update: (view: any) => {},
  add: (view: any) => {}
}

const meta: Meta<CustomViewsUpsertDialogComponent> = {
    title: 'Components/app-custom-views-upsert-dialog',
    component: CustomViewsUpsertDialogComponent,
    excludeStories: /.*Data$/,
    tags: ['connections dialog'],

    render: (args: CustomViewsUpsertDialogComponent) => ({
      props: {
        ...args,
      },
      template: `<app-custom-views-upsert-dialog ${argsToTemplate(
        args
      )}></app-custom-views-upsert-dialog>`,
    })

  };
  
  export default meta;
  type Story = StoryObj<CustomViewsUpsertDialogComponent>;
  
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
            {provide:CustomViewsStateService, useValue: customViewsStateServiceMock}
        ],
      }),
    ],
  };
  


