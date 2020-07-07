
describe('Navigation tests', function () {
    it('nav home to highscore page', function () {
        cy.visit('http://localhost:3000/');
        cy.contains('HIGH-SCORE').click()
        cy.url()
            .should('include', 'high-score')
    });
})

describe('Start a 4 game pairs game', function () {
    it('input a name', function () {
        cy.visit('http://localhost:3000/');
        cy.get('.name-input').type('tester')
        cy.contains('Yalla').click();
        cy.url()
            .should('include', 'game');
        cy.contains('tester');
        cy.contains('playing 4 pairs')
    });
})
describe('Start a 6 pairs game', function () {
    it('input a name', function () {
        cy.visit('http://localhost:3000/');
        cy.get('.name-input').type('tester')
        cy.contains('6').click();
        cy.contains('Yalla').click();
        cy.url()
            .should('include', 'game');
        cy.contains('tester');
        cy.contains('playing 6 pairs')
    });
})
