import { Produto } from "./produto";

export class TabelaPreco {
    cdTabelaPreco: number;
    cdProduto: number;
    produto: Produto;
    vlTotal: number;
    nrMargemLucro: number;
    dtRegistro: Date;
    dtAlteracao: Date;
}