import { render, fireEvent } from "@testing-library/react";
import Modal from "./index";

describe("<Modal />", () => {
  it("should not render the modal when isOpen is false", () => {
    const { queryByTestId } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        Hi
      </Modal>
    );
    expect(queryByTestId("modal")).toBeNull();
  });

  it("should match the snapshot", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        Hi
      </Modal>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the modal when isOpen is true", () => {
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        Hi
      </Modal>
    );
    expect(getByTestId("modal")).toBeInTheDocument();
  });

  it("should call onClose when the close icon is clicked", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        Hi
      </Modal>
    );
    fireEvent.click(getByTestId("close-icon"));
    expect(onClose).toHaveBeenCalled();
  });
});
