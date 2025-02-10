import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';

@Component({
  selector: 'app-services-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss']
})
export class ServicesFormComponent {
  servicioForm: FormGroup;

  constructor(private fb: FormBuilder, private servicioService: HotelService) {
    this.servicioForm = this.fb.group({
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.servicioForm.valid) {
      this.servicioService.agregarServicio(this.servicioForm.value).subscribe(response => {
        console.log('Servicio agregado:', response);
        this.servicioForm.reset();
      });
    }
  }
}
