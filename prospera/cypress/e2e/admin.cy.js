describe('Admin Dashboard - User Management', () => {
    beforeEach(() => {
      cy.visit('/admin'); // Adjust the route if necessary
    });
  
    it('should fetch and display the list of users', () => {
      // Mock the server response for users
      cy.intercept('GET', '**/admin/users', {
        statusCode: 200,
        body: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
        ],
      }).as('getUsers');
  
      cy.wait('@getUsers');
  
      // Check if the users are rendered
      cy.get('ul').should('contain', 'John Doe').and('contain', 'john@example.com');
      cy.get('ul').should('contain', 'Jane Doe').and('contain', 'jane@example.com');
    });
  });
  