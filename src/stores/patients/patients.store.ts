import { getPatients } from "../../api";
import { IFilters, IPatient, IPatientsStore } from "../../models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialFilters = {
  age: "-1",
  gender: "All",
  query: "",
  isInitial: false,
  sort: {
    field: "patient_id",
    order: "asc",
  },
} as IFilters;

const usePatientsStore = create<IPatientsStore>()(
  devtools(
    persist(
      (set, get) => ({
        reload: async () => {
          const patientsData = await getPatients(initialFilters);
          set({ patients: patientsData });
          localStorage.removeItem("patient-storage");
        },
        filters: initialFilters,
        setFilters: (filters) => {
          set({ filters });
        },
        patients: [],
        setPatients: (patients: IPatient[]) => set({ patients }),
      }),
      {
        name: "patient-storage",
      }
    )
  )
);

export default usePatientsStore;
