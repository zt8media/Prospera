// checks if the homepage has the header sections
describe("Home Page", () => {
  it("checks all essential elements", () => {
    cy.visit("http://localhost:5173");

    cy.get('img[alt="stack of money"]').should("be.visible");
    cy.contains("Click the Piggy for a Joke!").should("be.visible");
    cy.contains("Smart Money Starts Here").should("be.visible");
  });
});

// checks if the "who are we" section has the required heading and logo
describe("Who Are We Section Block", () => {
  it("should display the correct icon and description for the 'Who are We' section", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Who are We?").should("be.visible");
    cy.contains("Prospera is designed to").should("be.visible");
  });
});
