import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gully-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gully-form.html',
  styleUrl: './gully-form.scss',
})
export class GullyFormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
}
