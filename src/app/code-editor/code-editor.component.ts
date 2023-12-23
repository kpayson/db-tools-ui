import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ViewChild,
  ElementRef,
  inject,
} from '@angular/core';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/json';
import 'brace/theme/monokai';


@Component({
  selector: 'app-code-editor',
  template: ` <div style="border:1px solid silver;"><div #editor></div></div> `,
  styleUrls: ['./code-editor.component.scss'],

})
export class CodeEditorComponent
  implements OnChanges, OnDestroy, AfterViewInit
{

  @Input() initialData: string = '';
  @Input() receivedData: (data: any) => any = () => {};
  @Input() errors: (data: any[]) => any = () => {};
  @Input() fileMode: 'javascript' | 'html' | 'json' | 'sql' = 'json';
  @Input() minLines = 3;
  @Input() maxLines = 30;
  @Input() readOnly = false;

  @ViewChild('editor') editorEl!: ElementRef;

  public editorData = '';

  private zone = inject(NgZone);
  private editor!: ace.Editor;
  private initialized = false;

  get editorErrors() {
    return this.zone.runOutsideAngular(() => {
      if (this.initialized && this.editor) {
        return this.editor
          .getSession()
          .getAnnotations()
          .filter((annotation: any) => annotation.type === 'error');
      } else {
        return [];
      }
    });
  }

  ngOnChanges() {
    this.zone.runOutsideAngular(() => {
      if (this.initialized) {
        this.editor.setValue(this.initialData);
      }
    });
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  onChangedAnnotations = () => {
    this.zone.runOutsideAngular(() => {
      if (typeof this.errors === 'function') {
        this.errors(this.editorErrors);
      }
    });
  };

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.editor = ace.edit(this.editorEl.nativeElement);
      this.editor.$blockScrolling = Infinity;
      this.editor.session.setMode(`ace/mode/${this.fileMode}`);
      this.editor.setTheme('ace/theme/monokai');

      this.editor.setOptions({
        minLines: this.minLines,
        maxLines: this.maxLines,
        autoScrollEditorIntoView: true,
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: true,
        printMargin: false
      });

      if (this.initialData) {
        if (this.fileMode === 'json') {
          this.editor.setValue(
            JSON.stringify(JSON.parse(this.initialData), null, '\t')
          );
        } else {
          this.editor.setValue(this.initialData, 1);
        }
      }

      this.editor.session.on('change', this.dataChanged);
      this.editor.session.on('changeAnnotation', this.onChangedAnnotations);
      this.editor.setReadOnly(this.readOnly);

      this.initialized = true;
      this.editor.resize();
    });
  }

  dataChanged = () => {
    this.zone.runOutsideAngular(() => {
      this.editorData = this.editor.getValue();

      if (this.receivedData) {
        try {
          if (this.fileMode === 'json') {
            const newObject = JSON.parse(this.editorData || '{}');
            this.receivedData(newObject);
          } else {
            this.receivedData(this.editorData);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}
