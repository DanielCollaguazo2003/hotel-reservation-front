export interface Reserva {
  idReserva?: number;
  idCliente: number;
  fechaReserva: string;
  duracionEstancia: number;
  estadoReserva: string;
  montoTotal: number;
}
