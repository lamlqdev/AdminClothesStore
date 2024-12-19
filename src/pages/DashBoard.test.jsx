import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import DashBoardPage from "./DashBoard";
import { useLoaderData } from "react-router-dom";

// Mock các component con
vi.mock("../components/CardDataStat", () => ({
  default: ({ icon, title, data }) => (
    <div data-testid="card">
      <span>{title}</span>
      <span>{data}</span>
    </div>
  ),
}));

vi.mock("../components/Chart/RevenueBarChart", () => ({
  default: ({ orders }) => (
    <div data-testid="revenue-bar-chart">Revenue Bar Chart</div>
  ),
}));

vi.mock("../components/Chart/OrderPieChart", () => ({
  default: () => <div data-testid="order-pie-chart">Order Pie Chart</div>,
}));

vi.mock("../components/Chart/OrderLineChart", () => ({
  default: ({ orders }) => (
    <div data-testid="order-line-chart">Order Line Chart</div>
  ),
}));

vi.mock("../components/Chart/OrderStatusPieChart", () => ({
  default: ({ orders }) => (
    <div data-testid="order-status-pie-chart">Order Status Pie Chart</div>
  ),
}));

// Mock useLoaderData
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useLoaderData: vi.fn(),
}));

describe("DashBoardPage", () => {
  it("renders the cards with correct data from loader", () => {
    // Giả lập dữ liệu từ loader
    useLoaderData.mockReturnValue({
      usersCount: 10,
      productsCount: 20,
      ordersCount: 5,
      orders: [
        { id: 1, total: 100 },
        { id: 2, total: 200 },
      ],
    });

    render(<DashBoardPage />);

    // Kiểm tra các card hiển thị đúng
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("Profits")).toBeInTheDocument();
    expect(screen.getByText("300$")).toBeInTheDocument(); // Tổng revenue = 100 + 200
  });

  it("renders the revenue bar chart with correct orders data", () => {
    const mockOrders = [
      { id: 1, total: 100 },
      { id: 2, total: 200 },
    ];
    useLoaderData.mockReturnValue({
      usersCount: 10,
      productsCount: 20,
      ordersCount: 5,
      orders: mockOrders,
    });

    render(<DashBoardPage />);

    // Kiểm tra chart
    expect(screen.getByTestId("revenue-bar-chart")).toBeInTheDocument();
    expect(screen.getByText("Revenue Bar Chart")).toBeInTheDocument();
  });

  it("renders the order pie chart", () => {
    useLoaderData.mockReturnValue({
      usersCount: 10,
      productsCount: 20,
      ordersCount: 5,
      orders: [],
    });

    render(<DashBoardPage />);

    // Kiểm tra chart
    expect(screen.getByTestId("order-pie-chart")).toBeInTheDocument();
    expect(screen.getByText("Order Pie Chart")).toBeInTheDocument();
  });

  it("renders the order line chart with orders data", () => {
    const mockOrders = [
      { id: 1, total: 100 },
      { id: 2, total: 200 },
    ];
    useLoaderData.mockReturnValue({
      usersCount: 10,
      productsCount: 20,
      ordersCount: 5,
      orders: mockOrders,
    });

    render(<DashBoardPage />);

    // Kiểm tra chart
    expect(screen.getByTestId("order-line-chart")).toBeInTheDocument();
    expect(screen.getByText("Order Line Chart")).toBeInTheDocument();
  });

  it("renders the order status pie chart", () => {
    const mockOrders = [
      { id: 1, total: 100, status: "completed" },
      { id: 2, total: 200, status: "pending" },
    ];
    useLoaderData.mockReturnValue({
      usersCount: 10,
      productsCount: 20,
      ordersCount: 5,
      orders: mockOrders,
    });

    render(<DashBoardPage />);

    // Kiểm tra chart
    expect(screen.getByTestId("order-status-pie-chart")).toBeInTheDocument();
    expect(screen.getByText("Order Status Pie Chart")).toBeInTheDocument();
  });
});
