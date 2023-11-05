import { IFilters, IPatient } from "../models";

const filterPatients = (patients: IPatient[], filter: IFilters): IPatient[] => {
  let filteredPatients = [...patients];

  // If there's a query, filter by the query
  if (filter.query && filter.query.length > 0) {
    filteredPatients = filteredPatients.filter(
      (patient) =>
        patient.first_name.toLowerCase().includes(filter.query.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(filter.query.toLowerCase())
    );
  }

  // Filter by gender if not 'All'
  if (filter.gender !== "All") {
    filteredPatients = filteredPatients.filter(
      (patient) => patient.gender === filter.gender
    );
  }

  // Filter by age
  if (filter.age && filter.age !== "-1") {
    if (filter.age === ">45") {
      filteredPatients = filteredPatients.filter(
        (patient) => patient.age >= 70
      );
    } else {
      const ageRange = filter.age.split("-").map(Number);
      filteredPatients = filteredPatients.filter(
        (patient) => patient.age >= ageRange[0] && patient.age <= ageRange[1]
      );
    }
  }

  return filteredPatients;
};

export { filterPatients };
