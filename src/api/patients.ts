import { IFilters, IPatient } from "../models";
import { filterPatients } from "../utilities";
import { usePatientsStore } from "../stores";

const getPatients = async (filters: IFilters): Promise<Array<IPatient>> => {
  // just to simulate a delay in the response from the server side (API) call to get the patients data
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const patients =usePatientsStore.getState().patients;
      const filteredPatients = filterPatients(patients as IPatient[], filters);
      if (filteredPatients.length === 0) return reject("No patients found");
      return resolve(filteredPatients);
    }, 300);
  }) as unknown as IPatient[];
};

const getPatient = async (id: number): Promise<IPatient> => {
  // just to simulate a delay in the response from the server side (API) call to get the patient data
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const patients = usePatientsStore.getState().patients;
      const patient = patients.find((p) => p.patient_id === id);
      if (!patient) return reject("Patient not found");
      return resolve(patient);
    }, 300);
  }) as unknown as IPatient;
};

export { getPatients, getPatient };
