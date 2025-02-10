import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from 'src/app/models/client';
import { ClientsService } from 'src/app/shared/services/hotel/clients.service';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {
  clientes: Cliente[] = [];

  constructor(private clientService: ClientsService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error obteniendo clientes:', err)
    });
  }
}
