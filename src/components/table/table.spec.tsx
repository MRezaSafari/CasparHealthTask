import { render } from "@testing-library/react";
import Table from "./index";
import { IColumnTemplate, IPatient } from "src/models";

const columns: IColumnTemplate<IPatient>[] = [
  {
    sortable: true,
    title: "First name",
    width: "20%",
    valueKey: "first_name",
    type: "string",
  },
  {
    sortable: true,
    title: "Last name",
    width: "20%",
    valueKey: "last_name",
    type: "string",
  },
];

const mockData: IPatient[] = [
  {
    patient_id: 260,
    first_name: "Berke",
    last_name: "Tett",
    email: "btett77@vimeo.com",
    gender: "Male",
    age: 67,
    avatar: "http://dummyimage.com/221x100.png/ff4444/ffffff",
  },
  {
    patient_id: 261,
    first_name: "Catlaina",
    last_name: "Estrella",
    email: "cestrella78@google.it",
    gender: "Female",
    age: 40,
    avatar: "http://dummyimage.com/113x100.png/ff4444/ffffff",
  },
];

describe("Table", () => {

  it("should render successfully", () => {
    const {container} = render(<div><Table columns={columns} data={[]} /></div>);
    expect(container.getElementsByTagName("table")[0]).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Table columns={columns} data={[]} />);
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot with data", () => {
    const { container } = render(<Table columns={columns} data={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it("should render the correct number of rows", () => {
    const { container } = render(<Table columns={columns} data={mockData} />);
    expect(container.querySelectorAll("tbody > tr").length).toBe(2);
  });
});
