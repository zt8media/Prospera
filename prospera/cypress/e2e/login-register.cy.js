//Test for login 

describe('Login Form Validation', () => {
    it('displays validation errors for incorrect inputs', () => {
      cy.visit('/login');  // Adjust this URL based on your application routing
  
      // Attempt to submit the form with invalid email
      cy.get('input[type="email"]').type('invalidemail');
      cy.get('input[type="password"]').type('123'); // Short password
      cy.get('button[type="submit"]').click();
  
      // Check for error messages
      cy.contains('Enter Valid Email').should('be.visible');
      cy.contains('Password must be at least 8 characters long').should('be.visible');
    });
  });
  
//Test for registration 
  describe('Registration Form Validation', () => {
    it('displays validation errors for incorrect inputs', () => {
      cy.visit('/register'); // Adjust this URL based on your application routing
  
      // Attempt to submit the form with invalid data
      cy.get('input[name="email"]').type('user');
      cy.get('input[name="password"]').type('123'); // Short password
      cy.get('button[type="submit"]').click();
  
      // Check for error messages
      cy.contains('Enter Valid Email').should('be.visible');
      cy.contains('Password must be at least 8 characters long').should('be.visible');
  
      // Provide correct data but check for absence of errors upon correction
      cy.get('input[name="email"]').clear().type('user@example.com');
      cy.get('input[name="password"]').clear().type('password1234');
      cy.get('button[type="submit"]').click();
  
      // Errors should not be visible anymore
      cy.contains('Enter Valid Email').should('not.exist');
      cy.contains('Password must be at least 8 characters long').should('not.exist');
    });
  });
  