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
  setPatients: (patients: IPatient[]) => void;
  initiate: () => void;
  reload: () => void;
}
