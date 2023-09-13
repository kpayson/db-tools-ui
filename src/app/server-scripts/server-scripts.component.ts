
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './server-scripts.component.html',
  styleUrls: ['./server-scripts.component.scss'],
})
export class ServerScriptsComponent implements OnInit {
  @Input() fields: string[]= [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  private parseTemplateParameters(template: string): string[] 
  {
    const regex = /{([^}]+)}/g; // Regular expression to match template parameters
    const matches = template.match(regex); // Get all matches of template parameters
  
    if(! matches) { return []; }

    return matches.map(match => match.slice(1, -1)); // Remove the curly braces from each match
  }

  ngOnInit() {
    this.form = this.fb.group({});
    
    this.fields.forEach(field => {
      this.form.addControl(field, this.fb.control(''));
    });
  }
}