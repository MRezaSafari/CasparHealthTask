import { getPatients } from "../../api";
import { IPatient, IPatientsStore } from "../../models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const usePatientsStore = create<IPatientsStore>()(
  devtools(
    persist(
      (set, get) => ({
        reload: async () => {
          const patientsData = await getPatients({
            age: "-1",
            gender: "All",
            query: "",
            isInitial: false,
          });
          set({ patients: patientsData });
          localStorage.removeItem("patient-storage");
        },
        filters: {
          age: "-1",
          gender: "All",
          query: "",
          isInitial: true,
        },
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
