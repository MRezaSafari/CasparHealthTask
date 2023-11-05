import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPatient } from "../../api";
import { IPatient } from "../../models";
import { BackButton, PatientContainer } from "./patient.styles";
import Modal from "../../components/modal";
import { usePatientsStore } from "../../stores";

const PatientDetails: FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<IPatient | undefined>();
  const [modalState, setModalState] = useState<boolean>(false);
  const usePatient = usePatientsStore();
  const navigate = useNavigate();

  const fetchPatient = async () => {
    if (!id) return;
    const patient = await getPatient(+id);

    setPatient(patient);
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  const handlePatientDelete = () => {
    if (!id) return;
    usePatient.removePatient(+id);
    setModalState(false);
    navigate("/");
  };

  const handleOpenModal = () => {
    setModalState(!modalState);
  };

  if (!patient) return <div>Loading ...</div>;

  return (
    <PatientContainer>
      <Modal
        title="Confirm Deleting Patient"
        isOpen={modalState}
        onClose={handleOpenModal}
      >
        <p>Are you sure you want to delete {patient.patient_id} ?</p>

        <button onClick={handlePatientDelete}>Confirm</button>
      </Modal>

      <div>
        <BackButton>
          <Link to="/">Go Back</Link>
        </BackButton>
      </div>

      <img src={patient.avatar} alt="avatar" />

      <p>
        Full Name: {patient.first_name} {patient.last_name}
      </p>
      <p>Email: {patient.email}</p>
      <p>Gender: {patient.gender}</p>
      <p>Age: {patient.age}</p>

      <button onClick={handleOpenModal} data-testid='delete-patient-button'>Delete Patient</button>
    </PatientContainer>
  );
};

export default PatientDetails;
