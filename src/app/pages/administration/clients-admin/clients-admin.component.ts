import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/shared/services/hotel/clients.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.scss']
})
export class ClientsAdminComponent {
  clientes: any[] = [];
  searchText: string = '';

  constructor(private clienteService: ClientsService, private router: Router) {}

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClients().subscribe(data => {
      this.clientes = data;
    });
  }

  clientesFiltrados() {
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  nuevoCliente() {
    this.router.navigate(['/client-form']);
  }

  editarCliente(cliente: any) {
    this.router.navigate(['/client-form'], { queryParams: { id: cliente.idCliente } });
  }

  eliminarCliente(idCliente: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      // this.clienteService.deleteCliente(idCliente).subscribe(() => {
      //   this.obtenerClientes();
      // });
    }
  }
}
