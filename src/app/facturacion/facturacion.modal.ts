import { Clientes } from '../clientes/clientes.model';
import { Vendedores } from '../vendedores/vendedores.modal';
import { Detalles } from '../detalles/detalles.modal';

export class Facturacion {
    facturaId: number;
    vendedorId: number;
    clienteId: number;
    tipoPago: string;
    fecha: Date;
    comentario: string;
    cantidad: number;
    precioUnitario: number;
    clientes: Clientes;
    vendedores: Vendedores;
    detallesFactura: Detalles;

}
