import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { GullyFormComponent } from './components/gully-form/gully-form';
import { GullyVisualizerComponent } from './components/gully-visualizer/gully-visualizer';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Gully } from './models/gully.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GullyFormComponent, GullyVisualizerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  protected readonly title = signal('ireckoncity-gully-app');

  form!: FormGroup;
  showForm = false;
  popupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      gullies: this.fb.array([]),
    });

    // Create a gully by default
    this.gullies.push(this.createGullyGroup());

    this.popupForm = this.createGullyGroup();
  }

  get gullies(): FormArray {
    return this.form.get('gullies') as FormArray;
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  //todo: add more validators like pipe diameter should be less than gully height etc.

  createGullyGroup(): FormGroup {
    return this.fb.group({
      height: [103, [Validators.required, Validators.min(30)]],
      width: [50, [Validators.required, Validators.min(30)]],
      pipeHeight: [53, Validators.required],
      pipeDiameter: [20, [Validators.required, Validators.min(5)]],
      waterLevel: [27, [Validators.required, Validators.min(0)]],
    });
  }

  mapFormToGully(form: FormGroup): Gully {
    const value = form.value;

    return {
      heightInCM: value.height,
      widthInCM: value.width,
      pipeHeightInCM: value.pipeHeight,
      pipeDiameterInCM: value.pipeDiameter,
      waterLevelInCM: value.waterLevel,
    };
  }

  openForm() {
    this.popupForm = this.createGullyGroup();
    this.showForm = true;
  }

  saveGully() {
    if (this.popupForm.valid) {
      this.gullies.push(this.popupForm);
      this.showForm = false;
    }
  }

  closeForm() {
    this.showForm = false;
  }
}
