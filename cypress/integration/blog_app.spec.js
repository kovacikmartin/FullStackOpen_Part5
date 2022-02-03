describe('Blog app', function() {

    beforeEach(function() {

        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {

            username: 'groot',
            name: 'Garry Root',
            password: 'groot'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Log in button is present for a not logged in user', function() {

        cy.contains('Blogs')
        cy.contains('Log in')
    })

    describe('Login', function() {

        it('succeeds with correct credentials', function() {

            cy.contains('Log in').click()
            cy.get('#loginFormUsername').type('groot')
            cy.get('#loginFormPassword').type('groot')
            cy.get('#loginFormLogin').click()
            cy.contains('groot is logged in')
            cy.get('html').should('not.contain', 'Wrong credentials')
        })

        it('does not succeed with incorrect credentials', function() {

            cy.contains('Log in').click()
            cy.get('#loginFormUsername').type('user')
            cy.get('#loginFormPassword').type('password')
            cy.get('#loginFormLogin').click()
            cy.get('html').should('not.contain', 'user is logged in')
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function() {

        beforeEach(function() {

            cy.login({ username: 'groot', password: 'groot' })
        })

        it('User can create new blog', function() {

            cy.contains('Create new blog').click()
            cy.get('#title').type('New blog title')
            cy.get('#author').type('Author of new blog')
            cy.get('#url').type('New blog url')
            cy.get('#createButton').click()
            cy.get('html')
                .should('contain', 'New blog title')
                .and('contain', 'Author of new blog')
        })
    })
})