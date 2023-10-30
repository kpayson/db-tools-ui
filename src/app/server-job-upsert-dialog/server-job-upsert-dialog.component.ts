import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-server-job-upsert-component',
  templateUrl: './server-job-upsert-dialog.component.html',
  styleUrls: ['./server-job-upsert-dialog.component.scss']
})
export class ServerJobUpsertDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      template: ['', Validators.required],
      parameters: this.fb.array([])
    });
  }

  get parameters() {
    return this.formGroup.get('parameters') as FormArray;
  }

  addParameter() {
    const parameter = this.fb.group({
      name: ['', Validators.required],
      dataType: ['', Validators.required],
      defaultValue: ['']
    });
    this.parameters.push(parameter);
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }

  onSubmit() {
    // Handle form submission
  }
}
