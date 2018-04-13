import { Facturacion } from '../facturacion/facturacion.modal';
import { Articulos } from '../Articulos/articulos.model';
export class Detalles {
  detalleId: number;
  facturaId: number;
  articuloId: number;
  factura: Facturacion;
  articulo: string;

}
