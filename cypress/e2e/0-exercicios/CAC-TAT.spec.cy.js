/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', function() {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Messora Barranco')
    cy.get('#email').type('ricaiachi@gmail.com')
    cy.get('#open-text-area').type(
      'Não preciso de ajuda, obrigado. Estou apenas testando e aprendendo sobre esta nova ferramenta.',
      { delay: 0}
    )
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Messora Barranco')
    cy.get('#email').type('ricaiachigmail.com')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('campo de telefone continua vazio quando preenchido com valor não-numérico', function() {
    cy.get("#phone").type('ABCDE-FGHI').should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Messora Barranco')
    cy.get("#phone-checkbox").check()    
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').type('Rafael').should('have.value', 'Rafael')
    cy.get('#lastName').type('Messora Barranco').should('have.value', 'Messora Barranco')
    cy.get('#email').type('ricaiachi@gmail.com').should('have.value', 'ricaiachi@gmail.com')
    cy.get('#phone').type('11111111').should('have.value', '11111111')
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit('Rafael', 'Messora Barranco', 'ricaiachi@gmail.com', 'Teste')
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product').select(2).should('have.value', 'cursos')
  })
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]').each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]').check().should('be.checked')
      .last().uncheck().should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('myFile')
    cy.get('input[type="file"]').should('not.have.value')
      .selectFile('@myFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.eq('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
  })
  it('testa a página da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
})