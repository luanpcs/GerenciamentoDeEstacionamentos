/// <reference types="cypress"/>

describe('Casos de testes', () => {
    
    it('Caso de teste para tudo correto', () => { 
        cy.visit('http://127.0.0.1:5500/front-end/home.html')
        cy.get('[href="cadastro.html"] > .rounded').click();
        cy.get('#nome').type('Usuario');
        cy.get('#modelo').type('Modelo');
        cy.get('#placa').type('HDF-1716');
        cy.get('#btnOne').click();
        cy.get('.alert').should('contain.text', 'Usuário cadastrado com sucesso!');
    });

    it('Caso de testes faltando informacao ', () => { 
        cy.visit('http://127.0.0.1:5500/front-end/home.html')
        cy.get('[href="cadastro.html"] > .rounded').click();
        cy.get('#modelo').type('Modelo');
        cy.get('#placa').type('HDF-1716');
        cy.get('#btnOne').click();
        cy.get('.alert').should('contain.text', 'Preencha todos os dados!');
    });

    it('Caso de testes deletando um usuario', () => { 
        cy.visit('http://127.0.0.1:5500/front-end/home.html')
        cy.get('[href="cadastro.html"] > .rounded').click();
        cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
        cy.get('.alert').should('contain.text', 'Usuário deletado com sucesso!');
    });

    it('Caso de testes placa no formato incorreto', () => { 
        cy.visit('http://127.0.0.1:5500/front-end/home.html')
        cy.get('[href="cadastro.html"] > .rounded').click();
        cy.get('#nome').type('Usuario');
        cy.get('#modelo').type('Modelo');
        cy.get('#placa').type('HDF-171');
        cy.get('#btnOne').click();
        cy.get('.alert').should('contain.text', 'Placa inválida!');
    });

    it('Cadastrar um cliente e realizar o registro de entrada', () => { 
        cy.visit('http://127.0.0.1:5500/front-end/home.html')
        cy.get('[href="cadastro.html"] > .rounded').click();
        cy.get('#nome').type('Usuario_TesteAutomatizado');
        cy.get('#modelo').type('Modelo_TesteAutomatizado');
        cy.get('#placa').type('HDF-1716');
        cy.get('#btnOne').click();
        cy.get('.alert').should('contain.text', 'Usuário cadastrado com sucesso!');
        cy.get('[href="home.html"] > .back').click();
        cy.get('[href="regsitrar.html"] > .rounded').click();
        cy.get(':nth-child(1) > :nth-child(4) > .btn').click();
        cy.get(':nth-child(1) > :nth-child(4) > .btn').should('be.disabled');
    });
});
