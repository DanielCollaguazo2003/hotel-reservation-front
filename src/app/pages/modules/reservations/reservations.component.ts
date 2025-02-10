import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';
import { ClientsService } from 'src/app/shared/services/hotel/clients.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {
  reservaForm: FormGroup;
  reservas: any[] = [];
  clientes: any[] = [];

  constructor(private fb: FormBuilder, private reservaService: HotelService, private clienteService: ClientsService) {
    this.reservaForm = this.fb.group({
      id_cliente: ['', Validators.required],
      fecha_reserva: ['', Validators.required],
      duracion_estancia: ['', [Validators.required, Validators.min(1)]],
      estado_reserva: ['pendiente', Validators.required],
      monto_total: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.obtenerReservas();
    this.obtenerClientes();
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const formValue = this.reservaForm.value;
      formValue.id_cliente = +formValue.id_cliente;
      formValue.estado_reserva = formValue.estado_reserva.charAt(0);
      this.reservaService.addReserva(this.reservaForm.value).subscribe(response => {
        console.log('Reserva agregada:', response);
        this.reservaForm.reset();
        this.obtenerReservas(); // Refrescar la lista
      });
    }
  }

  obtenerReservas() {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data;
    });
  }

  obtenerClientes() {
    this.clienteService.getClients().subscribe(data => {
      this.clientes = data;
    });
  }

  getEstadoCompleto(estado: string): string {
    switch (estado) {
      case 'p': return 'Pendiente';
      case 'c': return 'Confirmada';
      case 'x': return 'Cancelada'; // Asumiendo 'x' es el código para cancelada
      default: return 'Desconocido'; // En caso de que llegue un valor no esperado
    }
  }
}
