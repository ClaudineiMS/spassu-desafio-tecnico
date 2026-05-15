import type { Venda } from "../../../types/venda";

type ItemVenda = Venda["itens"][number];

export function calcularComissaoItem(item: ItemVenda): number {
    const valorTotal = Number(item.valor_total);
    const percentualComissao = Number(item.percentual_comissao);

    return valorTotal * percentualComissao / 100;
}

export function calcularQuantidadeTotal(venda: Venda): number {
    return venda.itens.reduce(
        (total, item) => total + item.quantidade,
        0,
    );
}

export function calcularTotalComissao(venda: Venda): number {
    return venda.itens.reduce(
        (total, item) => total + calcularComissaoItem(item),
        0,
    );
}

export function obterDescricaoProduto(item: ItemVenda): string {
    return `${item.produto} - ${item.produto_descricao}`;
}