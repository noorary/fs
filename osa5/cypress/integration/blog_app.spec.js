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
      cy.login({ username: 'tester', password: 'salainen'})
    })

    it('a new blog can be added', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testing blog')
      cy.get('#author').type('testi testaaja')
      cy.get('#url').type('www.testataan.com')
      cy.get('#add-blog').click()
      cy.contains('testing blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'author1', url: 'www.blog1.com', likes: 0})
        cy.createBlog({ title: 'second blog', author: 'author2', url: 'www.blog2.com', likes: 1})
        cy.createBlog({ title: 'third blog', author: 'author3', url: 'www.blog3.com', likes: 2})
      })

      it('blogs are sorted based on likes', function () {
        cy.contains('view').click()
        cy.contains('www.blog3.com')
        cy.contains('view').click()
        cy.contains('hide').click()
        cy.contains('www.blog2.com')
      })

      it.only('blogs are sorted after likes', function () {
        cy.contains('first blog').parent().find('button').click()
        cy.contains('first blog').parent().find('button').contains('like').click()
        cy.contains('first blog').parent().find('button').contains('like').click()
        cy.contains('first blog').parent().find('button').contains('like').click()
        cy.contains('hide').click()
        cy.contains('view').click()
        cy.contains('www.blog1.com')


      })

      it('it can be liked', function () {
        cy.contains('first blog').parent().find('button').click()
        cy.contains('likes 0')
        cy.contains('first blog').parent().find('button').contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.contains('first blog').parent().find('button').click()
        cy.contains('first blog').parent().find('button').contains('remove').click()
        cy.get('first blog').should('not.exist')
      })
    })
  })
})