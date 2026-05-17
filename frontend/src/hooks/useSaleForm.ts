import { useCallback, useEffect, useMemo, useState } from "react";

import { listarClientes } from "../services/clientesService";
import { listarProdutos } from "../services/produtosService";
import { criarVenda, atualizarVenda } from "../services/vendasService";
import { listarVendedores } from "../services/vendedoresService";
import type {
    ClienteResumo,
    ProdutoResumo,
    VendedorResumo,
} from "../types/sales";
import type { Venda } from "../types/sales";

export interface SaleItem {
    produto: ProdutoResumo;
    quantidade: number;
}

interface UseSaleFormParams {
    initialSale?: Venda | null;
}

interface UseSaleFormResult {
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
    setQuantity: (value: number) => void;
    setSelectedClientId: (value: number | "") => void;
    setSelectedSellerId: (value: number | "") => void;
    setSaleDate: (value: string) => void;
    handleAddItem: () => void;
    handleRemoveItem: (productId: number) => void;
    handleSubmit: () => Promise<boolean>;
    isEditing: boolean;
    clientSearchTerm: string;
    sellerSearchTerm: string;
    setClientSearchTerm: (value: string) => void;
    setSellerSearchTerm: (value: string) => void;
    selectedClient: ClienteResumo | null;
    handleClientChange: (client: ClienteResumo | null) => void;
    handleClientSearchChange: (value: string) => void;
    selectedSeller: VendedorResumo | null;
    handleSellerChange: (seller: VendedorResumo | null) => void;
    handleSellerSearchChange: (value: string) => void;
    productSearchTerm: string;
    selectedProduct: ProdutoResumo | null;
    handleProductChange: (product: ProdutoResumo | null) => void;
    handleProductSearchChange: (value: string) => void;
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
    const initialClient = initialSale
        ? {
            id: initialSale.cliente,
            nome: initialSale.cliente_nome,
        }
        : null;

    const [selectedClient, setSelectedClient] = useState<ClienteResumo | null>(
        initialClient,
    );

    const [clientSearchTerm, setClientSearchTerm] = useState(
        initialClient ? `${initialClient.id} - ${initialClient.nome}` : "",
    );

    const [productSearchTerm, setProductSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<ProdutoResumo | null>(
        null,
    );

    const totalValue = useMemo(() => {
        return saleItems.reduce(
            (total, item) => total + calculateItemTotal(item),
            0,
        );
    }, [saleItems]);
    const initialSeller = initialSale
        ? {
            id: initialSale.vendedor,
            nome: initialSale.vendedor_nome,
            email: undefined,
            telefone: undefined,
        }
        : null;
    const [selectedSeller, setSelectedSeller] = useState<VendedorResumo | null>(
        initialSeller,
    );
    const [sellerSearchTerm, setSellerSearchTerm] = useState(
        initialSeller ? `${initialSeller.id} - ${initialSeller.nome}` : "",
    );

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
            const response = await listarProdutos(productSearchTerm);

            setProducts(response.results);
        } catch {
            setErrorMessage("Não foi possível buscar os produtos.");
        }
    }, [productSearchTerm]);

    const searchClients = useCallback(async (): Promise<void> => {
        try {
            const response = await listarClientes(clientSearchTerm);

            setClients(response.results);
        } catch {
            setErrorMessage("Não foi possível buscar os clientes.");
        }
    }, [clientSearchTerm]);

    const searchSellers = useCallback(async (): Promise<void> => {
        try {
            const response = await listarVendedores(sellerSearchTerm);

            setSellers(response.results);
        } catch {
            setErrorMessage("Não foi possível buscar os vendedores.");
        }
    }, [sellerSearchTerm]);

    function handleProductChange(product: ProdutoResumo | null): void {
        setSelectedProduct(product);
        setSelectedProductId(product?.id ?? "");

        setProductSearchTerm(
            product ? `${product.codigo} - ${product.descricao}` : "",
        );
    }

    function handleProductSearchChange(value: string): void {
        setProductSearchTerm(value);

        if (selectedProduct) {
            setSelectedProduct(null);
            setSelectedProductId("");
        }
    }

    function handleClientChange(client: ClienteResumo | null): void {
        setSelectedClient(client);
        setSelectedClientId(client?.id ?? "");

        setClientSearchTerm(
            client ? `${client.id} - ${client.nome}` : "",
        );
    }

    function handleClientSearchChange(value: string): void {
        setClientSearchTerm(value);

        if (selectedClient) {
            setSelectedClient(null);
            setSelectedClientId("");
        }
    }

    function handleSellerChange(seller: VendedorResumo | null): void {
        setSelectedSeller(seller);
        setSelectedSellerId(seller?.id ?? "");

        setSellerSearchTerm(
            seller ? `${seller.id} - ${seller.nome}` : "",
        );
    }

    function handleSellerSearchChange(value: string): void {
        setSellerSearchTerm(value);

        if (selectedSeller) {
            setSelectedSeller(null);
            setSelectedSellerId("");
        }
    }

    function handleAddItem(): void {
        if (!selectedProductId || quantity <= 0) {
            return;
        }

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

        setSelectedProduct(null);
        setSelectedProductId("");
        setQuantity(0);
        setProductSearchTerm("");
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

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            searchProducts();
        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchProducts]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            searchClients();
        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchClients]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            searchSellers();
        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [searchSellers]);

    return {
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
        setQuantity,
        setSelectedClientId,
        setSelectedSellerId,
        setSaleDate,
        handleAddItem,
        handleRemoveItem,
        handleSubmit,
        isEditing,
        clientSearchTerm,
        sellerSearchTerm,
        setClientSearchTerm,
        setSellerSearchTerm,
        selectedClient,
        handleClientChange,
        handleClientSearchChange,
        selectedSeller,
        handleSellerChange,
        handleSellerSearchChange,
        productSearchTerm,
        selectedProduct,
        handleProductChange,
        handleProductSearchChange
    };
}