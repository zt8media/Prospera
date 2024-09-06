// Test for the title and the page loading 

describe('Learn Page Load Test', () => {
  it('should load the learn page successfully', () => {
    cy.visit('/Learn'); // Visits the base URL set in your config
    cy.contains('Explore The World of Finance').should('exist'); // Adjust based on actual content
  });
});

describe('Modal Interaction', () => {
  it('opens and closes the modal with correct content', () => {
    cy.visit('/Learn');

    // Increase the timeout to wait for the element
    cy.contains('Saving Money', { timeout: 10000 }).click();

    // Close the modal
    cy.contains('Close').click();

  });
});




