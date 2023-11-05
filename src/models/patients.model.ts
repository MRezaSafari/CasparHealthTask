export type Gender = "Male" | "Female";

export interface IPatient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  age: number;
  avatar: string;
}

export interface IPatientsStore {
  patients: IPatient[];
  filteredPatients: IPatient[];
  setFilteredPatients: (patients: IPatient[]) => void;
  setPatients: (patients: IPatient[]) => void;
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
  clearFilters: () => void;
  removePatient: (id: number) => void;
  initiate: (patients: IPatient[]) => void;
}

export interface IFilters {
  isInitial: boolean;
  query: string;
  age: string;

  gender: Gender | 'All';
  sort: {
    field: keyof IPatient;
    order: 'asc' | 'desc';
  };
}
