describe('Contact Form Validation', () => {
    it('displays error messages for invalid inputs', () => {
      cy.visit('/Contact');  // Adjust the URL based on your route setup
  
      // Attempt to submit the form with empty fields
      cy.get('input[name="name"]').clear();
      cy.get('input[name="email"]').type('invalidemail'); // Incorrect email format
      cy.get('textarea[name="comment"]').clear();
  
      // Submit the form
      cy.get('form').submit();
  
      // Check for error messages
      cy.contains('Name is required').should('be.visible');
      cy.contains('Email is invalid').should('be.visible');
      cy.contains('Comment is required').should('be.visible');
    });
  });

//   describe('Contact Form Submission', () => {
//   it('submits the form successfully with valid inputs', () => {
//     cy.visit('/Contact');  // Adjust the URL based on your route setup

//     // Fill in the form
//     cy.get('input[name="name"]').type('John Doe');
//     cy.get('input[name="email"]').type('john.doe@example.com');
//     cy.get('textarea[name="comment"]').type('This is a test comment.');

//     // Submit the form
//     cy.get('form').submit();

//     // Check for the success message
//     cy.contains('Thank you for your message! We will get back to you within 24 hours.').should('be.visible');
//   });
// });
