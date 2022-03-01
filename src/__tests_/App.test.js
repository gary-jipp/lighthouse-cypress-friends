import { screen, render, cleanup, fireEvent, prettyDOM, within } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "App";
import mockedAxios from 'axios';

const axiosRes = {
  data: [
    { name: "Betty White", uid: "1" },
    { name: "Freddy Mercury", uid: "2" },
    { name: "James Holden", uid: "3" },
    { name: "Tom Cruise", uid: "4" },
    { name: "Kanye Rest", uid: "5" },
  ]
};

afterEach(cleanup);

describe('List Tests', () => {

  it("renders with no data without crashing", () => {
    render(<App />);
  });

  it("can enter text into the input field", () => {
    const { container } = render(<App />);

    // const input = screen.getByPlaceholderText("Enter Name");
    // const input = screen.getByTestId("text-input");
    const input = screen.getByRole("textbox"); // n
    // console.log(prettyDOM(input));

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    // console.log(prettyDOM(input));

    expect(screen.getByDisplayValue("Lydia Miller-Jones")).toBeInTheDocument();  // Need Jest-dom
  });

  it("can add a friend", () => {
    const { container } = render(<App />);

    const input = screen.getByTestId("text-input");
    // console.log(prettyDOM(input));

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    // console.log(prettyDOM(input));
    expect(screen.getByDisplayValue("Lydia Miller-Jones")).toBeInTheDocument(); // Need Jest-dom

    // const button = screen.getByRole("button");    // Multiple found - error
    const buttons = screen.getAllByRole("button");    // Multiple found - list
    // console.log(prettyDOM(buttons[0]));
    // buttons.find("Add Item");

    const addItem = screen.getByText("Add Item");
    fireEvent.click(addItem);

    // console.log(prettyDOM(container));

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toEqual(1);
    expect(listItems[0]).toHaveTextContent("Lydia Miller-Jones");
  });


  it("can load friends from API", async () => {
    const { container } = render(<App />);

    mockedAxios.get.mockResolvedValueOnce(axiosRes);

    const button = screen.getByTestId("load-friends");    // Multiple found - list
    fireEvent.click(button);


    // // console.log(prettyDOM(container));
    // // const listItems = screen.getAllByRole("listitem");  // This won't work because Async call

    // // Add async and await
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toEqual(5);

    expect(listItems[0]).toHaveTextContent("Betty White");

    const list = screen.getByRole("list");
    console.log(prettyDOM(list));
  });

});
