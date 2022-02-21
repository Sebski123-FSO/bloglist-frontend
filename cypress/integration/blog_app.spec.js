/// <reference types="Cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.clearLocalStorage();
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "sebastian",
      userName: "sebski123",
      password: "secret",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("[data-cy='title']").contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("sebski123");
      cy.get("#password").type("secret");
      cy.get("#submitBtn").click();

      cy.get("[data-cy='title']").contains("Blogs");
      cy.contains("User sebastian logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("sebski123");
      cy.get("#password").type("wrong");
      cy.get("#submitBtn").click();

      cy.get("[data-cy='title']").contains("Log in to application");
      cy.get("#notification")
        .contains("wrong username or password")
        .should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        userName: "sebski123",
        password: "secret",
      }).then((res) => {
        window.localStorage.setItem(
          "blogListSavedUser",
          JSON.stringify(res.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.get(".toggleButton").contains("new blog").click();
      cy.get("#newBlogTitle").type("New blog entry");
      cy.get("#newBlogAuthor").type("Shakespear");
      cy.get("#newBlogUrl").type("http://blog.shakespe.ar");
      cy.get("#newBlogSubmit").click();

      cy.get("#notification")
        .contains("blog New blog entry has been added")
        .should("have.css", "color", "rgb(0, 128, 0)");
      cy.contains("New blog entry Shakespear");
    });
  });
});
