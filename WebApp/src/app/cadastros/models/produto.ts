import { Marca } from "./marca";
import { Categoria } from "./categoria";
import { Estoque } from "./estoque";
import { TabelaPreco } from "./tabelaPreco";

export class Produto {
    cdProduto: number;
    dsProduto: string;
    dsModelo: string;
    dsInfAdicionais: string;
    fgAtivo: boolean;
    fgTipo: string;
    fgBicicleta: boolean;
    vlServico: number;
    cdMarca: number;
    marca: Marca;
    cdCategoria: number;
    categoria: Categoria;
    dtRegistro: Date;
    dtAlteracao: Date;
    estoqueList: Array<Estoque>;
    tabelaPrecoList: Array<TabelaPreco>;
}