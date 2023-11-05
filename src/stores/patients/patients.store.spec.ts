import { act, renderHook, waitFor } from "@testing-library/react";
import usePatientsStore from "./patients.store";
import { IFilters, IPatient } from "../../models";

const mockData: IPatient[] = [
  {
    patient_id: 260,
    first_name: "Berke",
    last_name: "Tett",
    email: "btett77@vimeo.com",
    gender: "Male",
    age: 67,
    avatar: "http://dummyimage.com/221x100.png/ff4444/ffffff",
  },
  {
    patient_id: 261,
    first_name: "Catlaina",
    last_name: "Estrella",
    email: "cestrella78@google.it",
    gender: "Female",
    age: 40,
    avatar: "http://dummyimage.com/113x100.png/ff4444/ffffff",
  },
];

describe("usePatientsStore", () => {
  it("Should not have any data before calling the initiate", () => {
    const { result } = renderHook(() => usePatientsStore());
    expect(result.current.patients.length).toEqual(0);
  });

  it("Should have data after calling the reload", async () => {
    const { result } = renderHook(() => usePatientsStore());

    expect(result.current.patients.length).toEqual(0);

    await act(async () => {
      result.current.clearFilters();
    });

    waitFor(() => {
      expect(result.current.patients.length).toBeGreaterThan(0);
    });
  });

  it("Should have default filters", () => {
    const { result } = renderHook(() => usePatientsStore());
    const defaultFilters = {
      age: "-1",
      gender: "All",
      query: "",
      isInitial: true,
      sort: {
        field: "patient_id",
        order: "asc",
      },
    } as IFilters;
    expect(result.current.filters).toEqual(defaultFilters);
  });

  it("Should update the filters when setFilters is called", () => {
    const { result } = renderHook(() => usePatientsStore());
    const newFilters = {
      age: "25",
      gender: "Male",
      query: "John",
      isInitial: true,
    } as IFilters;

    act(() => {
      result.current.setFilters(newFilters);
    });

    expect(result.current.filters).toEqual(newFilters);
  });

  it("Should update the patient list when setPatients is called", () => {
    const { result } = renderHook(() => usePatientsStore());

    act(() => {
      result.current.setPatients(mockData);
    });

    expect(result.current.patients).toEqual(mockData);
  });

});
