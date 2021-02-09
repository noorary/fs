describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Demo Tester',
      username: 'tester',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Log in to blog-application')
  })

  describe('Login', function() {
    it('user can login with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Demo Tester logged in')
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
  
      cy.get('html').should('not.contain', 'Demo Tester logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be added', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testing blog')
      cy.get('#author').type('testi testaaja')
      cy.get('#url').type('www.testataan.com')
      cy.get('#add-blog').click()
      cy.contains('testing blog')
    })
  })
})