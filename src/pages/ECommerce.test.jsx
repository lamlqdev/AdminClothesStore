import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import ECommercePage from "./ECommerce";
import { fetchProducts } from "../api/productAPI";
import { fetchCategories } from "../api/categoryAPI";

// Mock các component phụ
vi.mock("../components/Breadcrump", () => ({
  default: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));
vi.mock("../components/UI/LoadingIndicator", () => ({
  default: () => <div data-testid="loading-indicator">Loading...</div>,
}));
vi.mock("../components/UI/ErrorBlock", () => ({
  default: ({ title, message }) => (
    <div data-testid="error-block">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  ),
}));
vi.mock("../components/Table/ProductTable", () => ({
  default: ({ products, categories }) => (
    <div data-testid="product-table">
      <div>Products: {products.length}</div>
      <div>Categories: {categories.length}</div>
    </div>
  ),
}));

// Mock API
vi.mock("../api/productAPI", () => ({
  fetchProducts: vi.fn(),
}));
vi.mock("../api/categoryAPI", () => ({
  fetchCategories: vi.fn(),
}));

// Tạo QueryClient
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Để tránh gọi lại API trong lúc test
      },
    },
  });

describe("ECommercePage", () => {
  it("renders LoadingIndicator while loading", () => {
    // Mock useQuery để giả lập trạng thái loading
    fetchProducts.mockImplementation(() => new Promise(() => {})); // Pending promise
    fetchCategories.mockImplementation(() => new Promise(() => {})); // Pending promise

    render(
      <QueryClientProvider client={createQueryClient()}>
        <ECommercePage />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("renders ErrorBlock on error", async () => {
    // Mock useQuery để giả lập trạng thái lỗi
    fetchProducts.mockRejectedValueOnce(new Error("Failed to fetch products"));
    fetchCategories.mockRejectedValueOnce(
      new Error("Failed to fetch categories")
    );

    render(
      <QueryClientProvider client={createQueryClient()}>
        <ECommercePage />
      </QueryClientProvider>
    );

    // Đợi cho đến khi component hiển thị lỗi
    const errorBlock = await screen.findByTestId("error-block");
    expect(errorBlock).toBeInTheDocument();
    expect(screen.getByText(/an error occured/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
  });

  it("renders ProductTable on success", async () => {
    // Mock useQuery để giả lập trạng thái thành công
    fetchProducts.mockResolvedValueOnce([
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
    fetchCategories.mockResolvedValueOnce([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]);

    render(
      <QueryClientProvider client={createQueryClient()}>
        <ECommercePage />
      </QueryClientProvider>
    );

    // Đợi cho đến khi component hiển thị table
    const table = await screen.findByTestId("product-table");
    expect(table).toBeInTheDocument();
    expect(screen.getByText(/products: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/categories: 2/i)).toBeInTheDocument();
  });
});
