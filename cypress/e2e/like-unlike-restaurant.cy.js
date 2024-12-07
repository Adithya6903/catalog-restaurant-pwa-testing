describe('Favorite and unfavorite restaurant', () => {
  it('Likes and unlikes a restaurant', () => {
    cy.intercept('GET', '**/*.png', { statusCode: 200, body: '' });
    cy.intercept('GET', '**/*.jpg', { statusCode: 200, body: '' });

    cy.intercept('GET', 'https://restaurant-api.dicoding.dev/list').as('getRestaurantList');

    cy.log('Starting visit to the home page');

    cy.visit('/', { failOnStatusCode: false, timeout: 120000 });
    cy.wait(5000);
    // cy.log('Page visited, reloading...');
    // cy.reload();

    cy.wait('@getRestaurantList').then((interception) => {
      cy.log('Restaurant list loaded:', interception.response);
    });

    cy.get('.cta-detail', { timeout: 120000 }).first().click();

    // let restaurantId;
    // cy.url().then((url) => {
    //   restaurantId = url.split('/').pop();
    //   cy.log('Restaurant ID:', restaurantId);
    // });

    let restaurantTitle;
    cy.get('.restaurant-detail h2')
      .then(($restaurant) => {
        restaurantTitle = $restaurant.text();
        cy.log(restaurantTitle);
      });

    // cy.intercept('GET', `http://192.168.1.7:8030/detail/${restaurantId}`).as('getRestaurantDetail');
    // cy.wait('@getRestaurantDetail');

    cy.get('#favoriteButton').click();
    // cy.on('window:alert', (text) => {
    //   expect(text).to.equal(`${restaurantTitle} telah ditambahkan ke daftar favorit!`);
    // });
    // cy.reload();

    // cy.get('#favoriteButton', { timeout: 120000 }).should('contain', 'Remove from Favorites');

    cy.visit('/#/favorites', { timeout: 120000, failOnStatusCode: false });
    cy.wait(5000);

    cy.get('.restaurant-card', { timeout: 200000 }).should('have.length.greaterThan', 0);

    let likedRestaurantTitle;
    cy.get('.restaurant-info h3')
      .then(($likedRestaurant) => {
        likedRestaurantTitle = $likedRestaurant.text();
        cy.log(likedRestaurantTitle);
      });

    cy.expect(restaurantTitle).to.equal(likedRestaurantTitle);
    // cy.get('.restaurant-card').first().should('contain', restaurantTitle);

    cy.get('.cta-detail').first().click();
    cy.get('#favoriteButton').click();
    // cy.get('#favoriteButton').should('contain', 'Add to Favorites');

    cy.visit('/#/favorites', { failOnStatusCode: false });
    cy.get('p').should('contain', 'No favorite restaurants found.');
  });
});
