import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import CategoryPage from "./Category";
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
vi.mock("../components/Table/CategoryTable", () => ({
  default: ({ categories }) => (
    <div data-testid="category-table">
      {categories.map((cat) => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  ),
}));

// Mock API
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

describe("CategoryPage", () => {
  it("renders LoadingIndicator while loading", () => {
    // Mock useQuery để giả lập trạng thái loading
    fetchCategories.mockImplementation(() => new Promise(() => {})); // Pending promise

    render(
      <QueryClientProvider client={createQueryClient()}>
        <CategoryPage />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("renders ErrorBlock on error", async () => {
    // Mock useQuery để giả lập trạng thái lỗi
    fetchCategories.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(
      <QueryClientProvider client={createQueryClient()}>
        <CategoryPage />
      </QueryClientProvider>
    );

    // Đợi cho đến khi component hiển thị lỗi
    const errorBlock = await screen.findByTestId("error-block");
    expect(errorBlock).toBeInTheDocument();
    expect(screen.getByText(/an error occured/i)).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("renders CategoryTable on success", async () => {
    // Mock useQuery để giả lập trạng thái thành công
    fetchCategories.mockResolvedValueOnce([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ]);

    render(
      <QueryClientProvider client={createQueryClient()}>
        <CategoryPage />
      </QueryClientProvider>
    );

    // Đợi cho đến khi component hiển thị table
    const table = await screen.findByTestId("category-table");
    expect(table).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });
});
