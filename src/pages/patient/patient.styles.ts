import styled from "styled-components";

export const PatientContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
  }

  button {
    background-color: #e63946;
    color: #fff;
    border: none;
    width: fit-content;
    border-radius: 8px;
    padding: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
`;
export const BackButton = styled.button`
  margin-bottom: 30px;
  border: none;
  width: fit-content;
  background-color: transparent !important;
  cursor: pointer;
  a {
    padding: 8px;
    background-color: #709eff;
    color: #fff;
    border-radius: 4px;
  }
`;
