/// <reference types="Cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("[data-cy='title']").contains("Log in to application");
  });
});
