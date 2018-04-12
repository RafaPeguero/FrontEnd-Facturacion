
export class Asientos {
    asientoId: number;
    descripcion: string;
    clienteId: number;
    clientes: number;
    cuenta: number;
    tipoMovimiento: boolean;
    fechaAsiento: string;
    montoAsiento: number;
    estado: boolean;
}

// tslint:disable-next-line:class-name
export class asientosToContabilidad {
    AuxiliarId: number = 3;
    AsientoContableDescripcion: string;
    AsientoContableCuentaDebito: number;
    AsientoContableCuentaCredito: number;
    AsientoContableMonto: number;
}
