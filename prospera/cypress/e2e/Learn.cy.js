describe('Learn Page Load Test', () => {
  it('should load the learn page successfully', () => {
    cy.visit('/Learn'); // Visits the base URL set in your config
    cy.contains('Explore The World of Finance').should('exist'); // Adjust based on actual content
  });
});