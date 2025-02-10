import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/shared/services/hotel/clients.service';
import { Cliente } from 'src/app/models/client';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients-forms.component.html',
  styleUrls: ['./clients-forms.component.scss']
})
export class ClientsFormsComponent {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientsService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  agregarCliente() {
    if (this.clienteForm.valid) {
      const newClient: Cliente = this.clienteForm.value;
      this.clientService.addClient(newClient).subscribe({
        next: (res) => console.log('Cliente agregado con ID:', res.idClient),
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
