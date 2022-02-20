import React from "react";
import NewBlogForm from "../components/NewBlogForm";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe.only("<NewBlogForm />", () => {
  const createBlogMock = jest.fn();

  beforeEach(() => {
    render(<NewBlogForm createBlog={createBlogMock} />);
  });

  test("'createBlog' is invoked", () => {
    const titleInput = screen.getByPlaceholderText("Enter title of blog");
    const authorInput = screen.getByPlaceholderText(
      "Enter author of blog"
    );
    const urlInput = screen.getByPlaceholderText("Enter URL of blog");
    const submitButton = screen.getByText("create");

    userEvent.type(titleInput, "blog title");
    userEvent.type(authorInput, "blog author");
    userEvent.type(urlInput, "blog url");
    userEvent.click(submitButton);

    expect(createBlogMock.mock.calls.length).toBe(1);
  });
});
