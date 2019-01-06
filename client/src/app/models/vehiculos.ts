export class Vehiculos {
    _id: string;
    plate: string;
    model: string;
    year: number;
    lateral: string;
    class: string;
    passengers: number;
    operation_card: string;
    exp_to: Date;
    exp_soat: Date;
    exp_tech: Date;
    exp_prev: Date;
    GNV: Boolean;
    exp_rcc: Date;
    active: Boolean = true;
    internal: Boolean = true;
    state: Boolean = true;

}