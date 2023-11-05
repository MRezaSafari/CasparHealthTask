import { getPatients } from "../../api";
import { IPatient, IPatientsStore } from "../../models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const usePatientsStore = create<IPatientsStore>()(
  devtools(
    persist(
      (set, get) => ({
        initiate: async () => {
          if (get().patients.length === 0) {
            console.log("Initiating patients store...");
            const patientsData = await getPatients();
            set({ patients: patientsData });
          }
        },
        reload: async () => {
          console.log("Reloading patients store...");
          const patientsData = await getPatients();
          set({ patients: patientsData });
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
