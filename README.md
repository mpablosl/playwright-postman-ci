# QA Automation CI/CD

Projeto de prática para automatizar testes e executá-los em um pipeline CI/CD com GitHub Actions.

A ideia é integrar:

- **Playwright** para testes end-to-end da interface web.
- **Postman**, executado pelo **Newman**, para testes de API.

## Tecnologias

- [Playwright](https://playwright.dev/)
- [Postman](https://www.postman.com/)
- [Newman](https://www.npmjs.com/package/newman)
- [GitHub Actions](https://github.com/features/actions)
- Node.js e npm

## Pré-requisitos

- Node.js e npm instalados.
- Git instalado.
- Uma conta no GitHub.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/mpablosl/playwright-postman-ci.git
cd playwright-postman-ci
npm ci
```

Instale os navegadores necessários para o Playwright:

```bash
npx playwright install
```

## Testes com Playwright

Execute todos os testes:

```bash
npx playwright test
```

Execute um arquivo específico:

```bash
npx playwright test tests/login.spec.ts
```

Abra o relatório HTML:

```bash
npx playwright show-report
```

## Testes de API com Postman

As coleções do Postman serão executadas no terminal usando o Newman.

Quando essa etapa estiver configurada, o comando será semelhante a:

```bash
npx newman run postman/collection.json
```

A coleção e as variáveis de ambiente do projeto ficarão na pasta `postman/`. Tokens, senhas e outros dados sensíveis não devem ser armazenados nos arquivos versionados; no GitHub Actions, devem ser configurados como secrets.

## Pipeline CI/CD

O GitHub Actions será configurado para executar os testes automaticamente em eventos como `push` e `pull request`.

O pipeline terá estas etapas:

1. Baixar o código do repositório.
2. Configurar o Node.js e instalar as dependências.
3. Instalar os navegadores do Playwright.
4. Executar os testes Playwright.
5. Executar a coleção Postman com Newman.
6. Guardar relatórios de teste como artefatos, quando configurado.

## Estrutura planejada

```text
.
├── .github/
│   └── workflows/
│       └── tests.yml
├── postman/
│   └── collection.json
├── tests/
│   └── login.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

## Boas práticas

- Mantenha `package-lock.json` versionado para permitir instalações reproduzíveis com `npm ci`.
- Remova `test.only` antes de enviar alterações: ele executa apenas o teste marcado.
- Não coloque credenciais, tokens ou outros segredos no código ou nas coleções exportadas.
- Execute os testes localmente antes de enviar alterações.

## Objetivo de aprendizagem

Praticar automação de testes e integração contínua, começando com Playwright e adicionando testes de API com Postman/Newman ao mesmo repositório e pipeline.