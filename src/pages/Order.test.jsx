import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { useLoaderData } from "react-router-dom";
import OrderPage from "./Order";
import Breadcrumb from "../components/Breadcrump";
import OrderTable from "../components/Table/OrderTable";

// Mock các component con
vi.mock("../components/Breadcrump", () => ({
  default: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));

vi.mock("../components/Table/OrderTable", () => ({
  default: ({ orders }) => (
    <div data-testid="order-table">
      {orders.map((order) => (
        <div key={order.id}>{order.id}</div>
      ))}
    </div>
  ),
}));

// Mock useLoaderData
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useLoaderData: vi.fn(),
}));

describe("OrderPage", () => {
  it("renders the breadcrumb correctly", () => {
    useLoaderData.mockReturnValue([]);
    render(<OrderPage />);
    expect(screen.getByText("Order")).toBeInTheDocument();
  });

  it("renders the order table with orders data", async () => {
    const mockOrders = [
      { id: "order1", userId: "user1", total: 100 },
      { id: "order2", userId: "user2", total: 200 },
    ];
    useLoaderData.mockReturnValue(mockOrders);
    render(<OrderPage />);
    await waitFor(() =>
      expect(screen.getByTestId("order-table")).toBeInTheDocument()
    );
    expect(screen.getByText("order1")).toBeInTheDocument();
    expect(screen.getByText("order2")).toBeInTheDocument();
  });

  it("handles empty orders data", () => {
    useLoaderData.mockReturnValue([]);
    render(<OrderPage />);
    expect(screen.getByTestId("order-table")).toBeInTheDocument();
    expect(screen.queryByText("order1")).not.toBeInTheDocument();
    expect(screen.queryByText("order2")).not.toBeInTheDocument();
  });
});
