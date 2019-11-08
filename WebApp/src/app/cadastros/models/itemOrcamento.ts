import { Produto } from "./produto";
import { Orcamento } from "./orcamento";

export class ItemOrcamento {
    cdProduto: number;
    cdOrcamento: number;
    cdTabelaPreco: number;
    vlUnitario: number;
    vlTotal: number;
    qtProduto: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    orcamento: Orcamento;
    produto: Produto;
    //tabelaPreco: TabelaPreco;
}