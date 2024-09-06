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



describe('Learn Page Completion Toggle', () => {
  it('should toggle completion status and send request to the backend', () => {
    // Log in as a user first
    cy.visit('/login');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Visit the Learn page
    cy.visit('/learn');

    // Check if a topic is not completed
    cy.contains('Saving Money').click(); // Open the modal for 'Saving Money'
    
    // Toggle completion status
    cy.get('input[type="checkbox"]').should('not.be.checked').click(); // Toggle the switch

    // Intercept the request to check the backend call
    cy.intercept('PUT', '**/user/completion/Saving Money').as('toggleCompletion');

    // Assert that the toggleCompletion request was sent
    cy.wait('@toggleCompletion').its('response.statusCode').should('eq', 200);

    // Close the modal
    cy.contains('Close').click();
  });
});
