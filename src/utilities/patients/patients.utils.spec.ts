import { filterPatients } from "./patients.utils";
import patientsList from "../../data/mock_data.json";
import { IFilters, IPatient } from "../../models";

const mockFilter = {
  query: "",
  age: "-1",
  gender: "All",
  isInitial: false,
  sort: { field: "patient_id", order: "asc" },
} as IFilters;

describe("filterPatients", () => {
  const mockPatients = patientsList.slice(0, 10) as IPatient[];

  it("should filter by query", () => {
    const result = filterPatients(mockPatients, {
      ...mockFilter,
      query: "Gloriane",
    });
    expect(result.length).toBe(1);
    expect(result[0].first_name).toBe("Gloriane");
  });

  it("should filter by gender", () => {
    const result = filterPatients(mockPatients, {
      ...mockFilter,
      gender: "Male",
    });
    expect(result.length).toBe(5);
  });

  it("should filter by age", () => {
    const result = filterPatients(mockPatients, {
      ...mockFilter,
      age: "18-30",
    });
    expect(result.length).toBe(1);
    expect(result[0].age).toBe(21);
  });

  it("should sort patients", () => {
    const result = filterPatients(mockPatients, {
      ...mockFilter,
      sort: { field: "age", order: "asc" },
    });
    expect(result[0].age).toBe(21);
    expect(result[1].age).toBe(32);
    expect(result[2].age).toBe(47);
  });

  it("should handle combination of filters", () => {
    const result = filterPatients(mockPatients, {
      ...mockFilter,
      gender: "Male",
      age: ">45",
      query: "Gloriane",
      sort: { field: "age", order: "asc"}
    });
    console.log(result)

    expect(result.length).toBe(1);
    expect(result[0].first_name).toBe("Gloriane");
  });

  it("should filter by age greater than 45", () => {
    const result = filterPatients(mockPatients, { ...mockFilter, age: ">45" });
    expect(result.length).toBe(8);
  });
});
