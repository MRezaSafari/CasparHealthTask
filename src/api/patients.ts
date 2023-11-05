import { IPatient } from "../models";
import patients from "../data/mock_data.json";

const getPatients = async (): Promise<Array<IPatient>> => {
  // just to simulate a delay in the response from the server side (API) call to get the patients data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(patients as IPatient[]);
    }, 300);
  }) as unknown as IPatient[];
};

export { getPatients };
