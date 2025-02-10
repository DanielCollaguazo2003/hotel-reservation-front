import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  pagoForm: FormGroup;
  pagos: any[] = [];
  facturas: any[] = [];

  constructor(private fb: FormBuilder, private pagoService: HotelService, private facturaService: HotelService) {
    this.pagoForm = this.fb.group({
      fecha_pago: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      id_factura: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerPagos();
    this.obtenerFacturas();
  }

  onSubmit() {
    if (this.pagoForm.valid) {
      this.pagoService.addPago(this.pagoForm.value).subscribe(response => {
        console.log('Pago agregado:', response);
        this.pagoForm.reset();
        this.obtenerPagos(); // Refrescar la lista
      });
    }
  }

  obtenerPagos() {
    this.pagoService.getPagos().subscribe(data => {
      this.pagos = data;
    });
  }

  obtenerFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
      console.log('Facturas:', this.facturas);
    });
  }
}
