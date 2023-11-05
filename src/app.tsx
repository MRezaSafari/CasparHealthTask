import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Helmet } from "react-helmet-async";
import GlobalStyle from "./globalStyles";
import PatientDetails from "./pages/patient";
import { usePatientsStore } from "./stores";
import { useEffect } from "react";
import patients from "./data/mock_data.json";
import { IPatient } from "./models";

const AppRoot = () => {
  const { setPatients } = usePatientsStore();

  const fetchPatients = () => {
    setPatients(patients as IPatient[]);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Caspar Health Interview Task</title>
      </Helmet>
      <main>
        <GlobalStyle />
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/patient/:id" element={<PatientDetails />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default AppRoot;
