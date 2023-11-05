import { FC, useEffect } from "react";
import { usePatientsStore } from "../../stores";
import Table from "../../components/table";
import {
  IColumnTemplate,
  IFilters,
  IPatient,
  OrderDirection,
} from "../../models";
import { Container } from "./home.styles";
import { useNavigate } from "react-router-dom";
import Filters from "./filters";
import { getPatients } from "../../api";

const columns: IColumnTemplate<IPatient>[] = [
  {
    sortable: false,
    title: "ID",
    width: "10%",
    valueKey: "patient_id",
    type: "string",
  },
  {
    sortable: true,
    title: "Full name",
    width: "90%",
    type: "string",
    valueKey: "full_name",
    render: (patient: IPatient) => `${patient.first_name} ${patient.last_name}`,
  },
];

const HomePage: FC = () => {
  const { patients, filters } = usePatientsStore();
  const navigate = useNavigate();

  const handleFiltersChange = async (filters: IFilters) => {
    try {
      const filteredData = await getPatients(filters);

      usePatientsStore.setState({ patients: filteredData });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (filters.isInitial) return;
    handleFiltersChange(filters);
  }, [filters]);

  const handleSort = (
    key: keyof IPatient | undefined,
    order: OrderDirection
  ) => {
    console.log(key, order);
  };

  const handleRowClick = (patient: IPatient) => {
    navigate(`/patient/${patient.patient_id}`);
  };

  return (
    <Container>
      <h1>Patients List</h1>

      <Filters />

      <Table
        columns={columns}
        data={patients}
        onSort={handleSort}
        onRowClick={handleRowClick}
      />
    </Container>
  );
};

export default HomePage;
