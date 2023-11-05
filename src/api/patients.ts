import { IFilters, IPatient } from "../models";
import patients from "../data/mock_data.json";
import { filterPatients } from "../utilities";

const getPatients = async (filters: IFilters): Promise<Array<IPatient>> => {
  // just to simulate a delay in the response from the server side (API) call to get the patients data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filteredPatients = filterPatients(patients as IPatient[], filters);
      if (filteredPatients.length === 0) return reject("No patients found");
      return resolve(filteredPatients);
    }, 300);
  }) as unknown as IPatient[];
};

export { getPatients };
