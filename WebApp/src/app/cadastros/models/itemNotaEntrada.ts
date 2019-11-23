import { Produto } from "./produto";
import { NotaEntrada } from "./notaEntrada";
import { Estoque } from "./estoque";

export class ItemNotaEntrada {
    cdNotaEntrada: number;
    cdProduto: number;
    //vlUnitario: number;
    vlTotal: number;
    vlCusto: number;
    qtProduto: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    produto: Produto;
    notaEntrada: NotaEntrada;
    estoqueList: Array<Estoque>;
}