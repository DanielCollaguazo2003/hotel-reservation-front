import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  facturaForm: FormGroup;
  facturas: any[] = [];
  reservas: any[] = [];

  constructor(private fb: FormBuilder, private facturaService: HotelService, private reservaService: HotelService) {
    this.facturaForm = this.fb.group({
      numero_factura: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      estado_pago: ['pendiente', Validators.required],
      subtotal: ['', [Validators.required, Validators.min(0)]],
      total: ['', [Validators.required, Validators.min(0)]],
      id_reserva: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerFacturas();
    this.obtenerReservas();
  }

  onSubmit() {
    if (this.facturaForm.valid) {
      this.facturaService.addFactura(this.facturaForm.value).subscribe(response => {
        console.log('Factura agregada:', response);
        this.facturaForm.reset();
        this.obtenerFacturas(); // Refrescar la lista
      });
    }
  }

  obtenerFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  obtenerReservas() {
    this.reservaService.getReservas().subscribe(data => {
      this.reservas = data;
    });
  }
}
