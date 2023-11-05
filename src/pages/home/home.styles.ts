import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 16px;

  select,
  input {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    padding: 5px 10px;
    min-width: 300px;
  }

  button {
    display: inline-block;
    background-color: #4c86ff;
    color: white;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    padding: 5px 10px;
    width: fit-content;
  }
`;
