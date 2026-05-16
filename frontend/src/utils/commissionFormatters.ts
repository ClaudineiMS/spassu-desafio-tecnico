export function formatCurrency(value: number | string): string {
    const numericValue = Number(String(value).replace(",", "."));

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(numericValue);
}