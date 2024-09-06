describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login'); // Adjust the route if necessary
  });

  it('should display the login form correctly', () => {
    cy.get('h2').contains('Login');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Login').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.get('small').contains('Enter Valid Email').should('be.visible');
    cy.get('small').contains('Password must be at least 8 characters long').should('be.visible');
  });

  it('should show server error for incorrect login credentials', () => {
    cy.get('input[type="email"]').type('wrongemail@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Mock the server response for incorrect credentials
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: { message: 'Invalid email or password.' },
    }).as('loginRequest');

    cy.wait('@loginRequest');
    cy.get('small').contains('Invalid email or password.').should('be.visible');
  });

 


});
