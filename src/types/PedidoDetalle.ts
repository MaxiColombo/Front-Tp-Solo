import { Instrument } from "./Instrument";
import { Pedido } from "./Pedido";

export interface PedidoDetalle {
    id: number;
    cantidad: number;
    pedido: Pedido;
    instrumento: Instrument;
}