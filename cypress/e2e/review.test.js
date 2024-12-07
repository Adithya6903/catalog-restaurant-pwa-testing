// cypress/e2e/review.test.js
describe('Customer Review', () => {
  it('should submit a review and display it on the page', () => {
    // Tangkap permintaan API untuk daftar restoran
    cy.intercept('GET', 'https://restaurant-api.dicoding.dev/list').as('getRestaurantList');
    cy.visit('/');
    
    // Tunggu sampai daftar restoran dimuat
    cy.wait('@getRestaurantList');
    
    // Klik detail restoran pertama
    cy.get('.cta-detail').first().click();

    // Tangkap permintaan API untuk detail restoran
    cy.intercept('GET', 'https://restaurant-api.dicoding.dev/detail/*').as('getRestaurantDetail');
    cy.wait('@getRestaurantDetail');
    
    // Input data untuk review
    cy.get('#reviewerName').type('Tester');
    cy.get('#reviewerContent').type('This is a test review.');
    
    // Kirim review
    cy.get('#reviewForm button[type="submit"]').click();
    
    // Verifikasi bahwa review ditambahkan ke halaman
    cy.get('.review').should('contain', 'Tester');
    cy.get('.review').should('contain', 'This is a test review.');
  });
});
