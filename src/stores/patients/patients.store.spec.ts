import { act, renderHook, waitFor } from "@testing-library/react";
import usePatientsStore from "./patients.store";

describe("usePatientsStore", () => {
  it("Should not have any data before calling the initiate", () => {
    const { result } = renderHook(() => usePatientsStore());
    expect(result.current.patients.length).toEqual(0);
  });

  it("Should have data after calling the initiate", async () => {
    const { result } = renderHook(() => usePatientsStore());

    expect(result.current.patients.length).toEqual(0);

    await act(async () => {
      result.current.initiate();
    });
    
    waitFor(() => {
      expect(result.current.patients.length).toBeGreaterThan(0);
    });
  });

});
