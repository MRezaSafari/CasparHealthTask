import React, { FC } from "react";
import { usePatientsStore } from "../../stores";

interface Props {}

const HomePage: FC<Props> = () => {
  const { patients } = usePatientsStore();
  return <>{patients.length}</>;
};

export default HomePage;
