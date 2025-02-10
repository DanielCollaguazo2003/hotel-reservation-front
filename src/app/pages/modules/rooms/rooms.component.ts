import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';
import { Habitacion } from 'src/app/models/room';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  habitacionForm: FormGroup;
  habitaciones: Habitacion[] = [];

  constructor(private fb: FormBuilder, private habitacionService: HotelService) {
    this.habitacionForm = this.fb.group({
      numero: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: [true, Validators.required],
      precio_por_noche: ['', [Validators.required, Validators.min(0)]],
      precio_por_dia: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.obtenerHabitaciones();
  }

  onSubmit() {
    if (this.habitacionForm.valid) {
      this.habitacionService.addHabitacion(this.habitacionForm.value).subscribe(response => {
        console.log('Habitación agregada:', response);
        this.habitacionForm.reset();
        this.obtenerHabitaciones(); // Refrescar la lista
      });
    }
  }

  obtenerHabitaciones() {
    this.habitacionService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }
}
