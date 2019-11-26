import { Produto } from "./produto";

export class TabelaPreco {
    cdTabelaPreco: number;
    cdProduto: number;
    produto: Produto;
    vlVenda: number;
    nrMargemLucro: number;
    dtRegistro: Date;
    dtAlteracao: Date;
}