// checks if the About Us section has the required heading and logo
describe("About Us Block", () => {
  it("should display the correct icon and description for the About Us section", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").contains("About Us").should("be.visible");
    cy.contains("Welcome to Prospera").should("be.visible");
  });
});

// checks if the What You Can Expect section has the required heading and logo
describe("What You Can Expect Block", () => {
  it("should display the correct icon and description for the What You Can Expect section", () => {
    cy.visit("http://localhost:5173");
    cy.get('img[alt="expect-img"]').should("be.visible");
    cy.contains("Welcome to Prospera").should("be.visible");
  });
});
