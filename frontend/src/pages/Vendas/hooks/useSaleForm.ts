import { useCallback, useEffect, useMemo, useState } from "react";

import { listarClientes } from "../../../services/clientesService";
import { listarProdutos } from "../../../services/produtosService";
import { criarVenda, atualizarVenda } from "../../../services/vendasService";
import { listarVendedores } from "../../../services/vendedoresService";
import type {
    ClienteResumo,
    ProdutoResumo,
    VendedorResumo,
} from "../../../types/venda";
import type { Venda } from "../../../types/venda";

export interface SaleItem {
    produto: ProdutoResumo;
    quantidade: number;
}

interface UseSaleFormParams {
    initialSale?: Venda | null;
}

interface UseSaleFormResult {
    searchTerm: string;
    quantity: number;
    selectedProductId: number | "";
    selectedClientId: number | "";
    selectedSellerId: number | "";
    saleDate: string;
    products: ProdutoResumo[];
    clients: ClienteResumo[];
    sellers: VendedorResumo[];
    saleItems: SaleItem[];
    totalValue: number;
    canSubmit: boolean;
    isLoadingInitialData: boolean;
    isSubmitting: boolean;
    errorMessage: string | null;
    setSearchTerm: (value: string) => void;
    setQuantity: (value: number) => void;
    setSelectedProductId: (value: number | "") => void;
    setSelectedClientId: (value: number | "") => void;
    setSelectedSellerId: (value: number | "") => void;
    setSaleDate: (value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (productId: number) => void;
    handleSubmit: () => Promise<boolean>;
    isEditing: boolean;
}

function getCurrentDateTimeValue(): string {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localDate = new Date(now.getTime() - timezoneOffset);

    return localDate.toISOString().slice(0, 16);
}

function calculateItemTotal(item: SaleItem): number {
    return Number(item.produto.valor_unitario) * item.quantidade;
}

function gerarNumeroNotaFiscal(): string {
    return `NF-${Date.now()}`;
}

function converterDataParaIso(data: string): string {
    return new Date(data).toISOString();
}

export function useSaleForm({ initialSale = null,
}: UseSaleFormParams = {}): UseSaleFormResult {
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState<number | "">("");
    const [selectedClientId, setSelectedClientId] = useState<number | "">(
        initialSale?.cliente ?? "",
    );
    const [selectedSellerId, setSelectedSellerId] = useState<number | "">(
        initialSale?.vendedor ?? "",
    );
    const [saleDate, setSaleDate] = useState(
        initialSale
            ? initialSale.data_hora.slice(0, 16)
            : getCurrentDateTimeValue(),
    );
    const [products, setProducts] = useState<ProdutoResumo[]>([]);
    const [clients, setClients] = useState<ClienteResumo[]>([]);
    const [sellers, setSellers] = useState<VendedorResumo[]>([]);
    const [saleItems, setSaleItems] = useState<SaleItem[]>(
        initialSale
            ? initialSale.itens.map((item) => ({
                produto: {
                    id: item.produto,
                    codigo: String(item.produto),
                    descricao: item.produto_descricao,
                    valor_unitario: item.valor_unitario,
                    percentual_comissao: item.percentual_comissao,
                },
                quantidade: item.quantidade,
            }))
            : [],
    );
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const isEditing = Boolean(initialSale);


    const totalValue = useMemo(() => {
        return saleItems.reduce(
            (total, item) => total + calculateItemTotal(item),
            0,
        );
    }, [saleItems]);

    const canSubmit = useMemo(() => {
        return (
            saleItems.length > 0
            && selectedClientId !== ""
            && selectedSellerId !== ""
            && Boolean(saleDate)
            && !isSubmitting
        );
    }, [
        saleItems.length,
        selectedClientId,
        selectedSellerId,
        saleDate,
        isSubmitting,
    ]);

    const loadInitialData = useCallback(async (): Promise<void> => {
        try {
            setIsLoadingInitialData(true);
            setErrorMessage(null);

            const [clientsResponse, sellersResponse, productsResponse] =
                await Promise.all([
                    listarClientes(),
                    listarVendedores(),
                    listarProdutos(),
                ]);

            setClients(clientsResponse.results);
            setSellers(sellersResponse.results);
            setProducts(productsResponse.results);
        } catch {
            setErrorMessage("Não foi possível carregar os dados da venda.");
        } finally {
            setIsLoadingInitialData(false);
        }
    }, []);

    const searchProducts = useCallback(async (): Promise<void> => {
        try {
            const response = await listarProdutos(searchTerm);

            setProducts(response.results);
        } catch {
            setErrorMessage("Não foi possível buscar os produtos.");
        }
    }, [searchTerm]);

    function handleAddItem(): void {
        if (!selectedProductId || quantity <= 0) {
            return;
        }

        const selectedProduct = products.find(
            (product) => product.id === selectedProductId,
        );

        if (!selectedProduct) {
            return;
        }

        setSaleItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.produto.id === selectedProduct.id,
            );

            if (!existingItem) {
                return [
                    ...currentItems,
                    {
                        produto: selectedProduct,
                        quantidade: quantity,
                    },
                ];
            }

            return currentItems.map((item) => {
                if (item.produto.id !== selectedProduct.id) {
                    return item;
                }

                return {
                    ...item,
                    quantidade: item.quantidade + quantity,
                };
            });
        });

        setSelectedProductId("");
        setQuantity(0);
        setSearchTerm("");
    }

    function handleRemoveItem(productId: number): void {
        setSaleItems((currentItems) => (
            currentItems.filter((item) => item.produto.id !== productId)
        ));
    }

    async function handleSubmit(): Promise<boolean> {
        if (!canSubmit || selectedClientId === "" || selectedSellerId === "") {
            return false;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage(null);

            const payload = {
                numero_nota_fiscal: initialSale
                    ? initialSale.numero_nota_fiscal
                    : gerarNumeroNotaFiscal(),
                data_hora: converterDataParaIso(saleDate),
                cliente: selectedClientId,
                vendedor: selectedSellerId,
                itens: saleItems.map((item) => ({
                    produto: item.produto.id,
                    quantidade: item.quantidade,
                })),
            };

            if (initialSale) {
                await atualizarVenda(initialSale.id, payload);
            } else {
                await criarVenda(payload);
            }

            return true;
        } catch {
            setErrorMessage(
                initialSale
                    ? "Não foi possível atualizar a venda."
                    : "Não foi possível finalizar a venda.",
            );

            return false;
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            searchProducts();
        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchProducts]);

    return {
        searchTerm,
        quantity,
        selectedProductId,
        selectedClientId,
        selectedSellerId,
        saleDate,
        products,
        clients,
        sellers,
        saleItems,
        totalValue,
        canSubmit,
        isLoadingInitialData,
        isSubmitting,
        errorMessage,
        setSearchTerm,
        setQuantity,
        setSelectedProductId,
        setSelectedClientId,
        setSelectedSellerId,
        setSaleDate,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
        isEditing
    };
}