import { useCallback, useEffect, useMemo, useState } from "react";

import { listarClientes } from "../../../services/clientesService";
import { listarProdutos } from "../../../services/produtosService";
import { listarVendedores } from "../../../services/vendedoresService";
import type {
    ClienteResumo,
    ProdutoResumo,
    VendedorResumo,
} from "../../../types/venda";

interface SaleItem {
    produto: ProdutoResumo;
    quantidade: number;
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
    errorMessage: string | null;
    setSearchTerm: (value: string) => void;
    setQuantity: (value: number) => void;
    setSelectedProductId: (value: number | "") => void;
    setSelectedClientId: (value: number | "") => void;
    setSelectedSellerId: (value: number | "") => void;
    setSaleDate: (value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (productId: number) => void;
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

export function useSaleForm(): UseSaleFormResult {
    const [searchTerm, setSearchTerm] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState<number | "">("");
    const [selectedClientId, setSelectedClientId] = useState<number | "">("");
    const [selectedSellerId, setSelectedSellerId] = useState<number | "">("");
    const [saleDate, setSaleDate] = useState(getCurrentDateTimeValue());
    const [products, setProducts] = useState<ProdutoResumo[]>([]);
    const [clients, setClients] = useState<ClienteResumo[]>([]);
    const [sellers, setSellers] = useState<VendedorResumo[]>([]);
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        );
    }, [saleItems.length, selectedClientId, selectedSellerId, saleDate]);

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
        errorMessage,
        setSearchTerm,
        setQuantity,
        setSelectedProductId,
        setSelectedClientId,
        setSelectedSellerId,
        setSaleDate,
        handleAddItem,
        handleRemoveItem,
    };
}