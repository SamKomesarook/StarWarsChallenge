import '@testing-library/cypress/add-commands';

describe('Home page', () => {
  it('should visit home page and show default text', () => {
    cy.visit('/');
    cy.findAllByText('Top rated starships').should('exist');
    cy.findAllByText('Select something...').should('exist');
  });
});
