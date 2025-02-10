import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelService } from 'src/app/shared/services/hotel/hotel.service';
import { Router } from '@angular/router';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './billing-admin.component.html',
  styleUrls: ['./billing-admin.component.scss']
})
export class BillingAdminComponent {

  facturas: any[] = [];
  searchText: string = '';

  constructor(private facturaService: HotelService, private router: Router) {}

  ngOnInit() {
    this.obtenerFacturas();
  }

  obtenerFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
      console.log('Facturas:', this.facturas);
    });
  }

  facturasFiltradas() {
    return this.facturas.filter(factura =>
      factura.numerofactura.toString().includes(this.searchText) ||
      factura.estadopago.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  nuevaFactura() {
    this.router.navigate(['/billing']);
  }

  editarFactura(factura: any) {
    this.router.navigate(['/billing'], { queryParams: { id: factura.idFactura } });
  }

  eliminarFactura(idFactura: number) {
    if (confirm('¿Estás seguro de eliminar esta factura?')) {
      // this.facturaService.deleteFactura(idFactura).subscribe(() => {
      //   this.obtenerFacturas();
      // });
    }
  }
}
