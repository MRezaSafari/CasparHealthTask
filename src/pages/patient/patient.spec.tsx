import { render, fireEvent, waitFor,screen} from "@testing-library/react";
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { IPatient } from "../../models";
import PatientDetails from "./index";
import { getPatient } from "../../api";
import HomePage from "../home";

jest.mock("../../api", () => ({
  getPatient: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/patient/:id",
    element: <PatientDetails />,
  },
];

const routerConfig = {
  initialEntries: ["/", "/patient/1"],
  initialIndex: 1,
  basename: "/",
}

describe("<PatientDetails />", () => {
  const mockPatient: IPatient = {
    "patient_id": 1,
    "first_name": "Gloriane",
    "last_name": "Skittles",
    "email": "gskittles0@google.ca",
    "gender": "Male",
    "age": 58,
    "avatar": "http://dummyimage.com/146x100.png/5fa2dd/ffffff"
  };

  beforeEach(() => {
    (getPatient as jest.Mock).mockResolvedValue(mockPatient);
  });

  it("should render patient details correctly", async () => {
    const router = createMemoryRouter(routes, routerConfig);

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("Full Name: Gloriane Skittles")).toBeInTheDocument();
      expect(screen.getByText("Email: gskittles0@google.ca")).toBeInTheDocument();
      expect(screen.getByText("Gender: Male")).toBeInTheDocument();
      expect(screen.getByText("Age: 58")).toBeInTheDocument();
    });
  });

  it("should handle patient deletion", async () => {
    const router = createMemoryRouter(routes, routerConfig);

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-patient-button"));
    });

    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to delete 1 ?")
      ).toBeInTheDocument();
    });

    await waitFor(() => fireEvent.click(screen.getByText("Confirm")));
  });

  it("should navigate back to the patient list when the back button is clicked", async () => {
    const router = createMemoryRouter(routes, routerConfig);

    render(<RouterProvider router={router} />);

    await waitFor(() => fireEvent.click(screen.getByText("Go Back")));
    
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/");
    });
  });
});
