import { Conta } from "./conta";
import { ClienteFornecedor } from "./clienteFornecedor";

export class NotaEntrada {
    cdNotaEntrada: number;
    conta: Conta;
    clienteFornecedor: ClienteFornecedor;
    nrNota: string;
    nrSerie: string;
    fgLancada: boolean;
    nrChaveAcesso: string;
    dtEmissao: Date;
    vlTotal: number;
    dtRegistro: Date;
    dtAlteracao: Date;
}