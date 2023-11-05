import {
  render,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./index";

describe("<HomePage />", () => {
  it("should renders correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(getByText("Patients List")).toBeInTheDocument();
  });

  it("should render the table", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(getByTestId("table")).toBeInTheDocument();
  });

  it("should render the table without any data", () => {
    const { getByText } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(getByText("No Data!")).toBeInTheDocument();
  });

  it("should render filters container", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(getByTestId("filters-container")).toBeInTheDocument();
  });

  it("should render all filters correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(getByTestId("filter-query")).toBeInTheDocument();
    expect(getByTestId("filter-gender")).toBeInTheDocument();
    expect(getByTestId("filter-age")).toBeInTheDocument();
    expect(getByTestId("sort-field")).toBeInTheDocument();
    expect(getByTestId("sort-direction")).toBeInTheDocument();
  });
});
