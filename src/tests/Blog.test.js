import React from "react";
import Blog from "../components/Blog";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  const testBlog = {
    title: "test Blog test",
    url: "http://blog.google.com",
    likes: 0,
    author: "sebski123",
    user: {
      userName: "root",
    },
  };

  const likeBlogMock = jest.fn();
  const deleteBlogMock = jest.fn();

  beforeEach(() => {
    render(
      <Blog
        blog={testBlog}
        likeBlog={likeBlogMock}
        deleteBlog={deleteBlogMock}
        userName="root"
      />
    );
  });

  test("Only basic content is rendered", () => {
    const basicInfo = screen.getByTestId("basicInfo");
    const url = screen.queryByText("http://blog.google.com");
    const likes = screen.queryByTestId("likes");

    expect(basicInfo).toBeVisible();
    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
  });
});
