import { Produto } from "./produto";
import { NotaEntrada } from "./notaEntrada";

export class ItemNotaEntrada {
    cdNotaEntrada: number;
    cdProduto: number;
    vlUnitario: number;
    vlTotal: number;
    vlCusto: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    produto: Produto;
    notaEntrada: NotaEntrada;
}