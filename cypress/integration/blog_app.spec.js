/// <reference types="Cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.clearLocalStorage("blogListSavedUser");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "sebastian",
      userName: "sebski123",
      password: "secret",
    });
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "badUser",
      userName: "imEvil",
      password: "hehehe",
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

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login("sebski123", "secret");
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

    describe("and blogs exist", function () {
      beforeEach(function () {
        cy.addBlog("new blog", "who knows", "example.com");
        cy.addBlog("new blog2", "who knows3", "example.com4");
      });

      it("User can like a blog", function () {
        cy.get("[data-testid='basicInfo']")
          .first()
          .parent()
          .as("blog")
          .find("button")
          .contains("view")
          .click();

        cy.get("@blog")
          .find("[data-testid='likes']")
          .as("likes")
          .should("have.text", "0 like")
          .find("button")
          .click();

        cy.get("@likes").should("have.text", "1 like");
      });

      it("User can delete own blog", function () {
        cy.get("[data-testid='extendedInfo']")
          .first()
          .find("button")
          .contains("delete")
          .click({ force: true });

        cy.get("#notification")
          .contains("blog has been deleted")
          .should("have.css", "color", "rgb(0, 128, 0)");
      });

      it("User can't delete non-owned blog", function () {
        cy.clearLocalStorage("blogListSavedUser");
        cy.login("imEvil", "hehehe");
        cy.get("[data-testid='extendedInfo']")
          .first()
          .find("button")
          .contains("delete")
          .click({ force: true });

        cy.get("#notification")
          .contains("Unauthorized")
          .should("have.css", "color", "rgb(255, 0, 0)");
      });
    });
  });
});
