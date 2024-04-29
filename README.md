# LABMedical - Sistema de Gestão de Inventário Médico

## Introdução
LABMedical, é uma aplicação para gestão de prontuários médicos desenvolvido para a empresa fictícia Medicine365 Inc. Este documento descreve o objetivo, tecnologias utilizadas e execução do sistema e possibilidades de melhorias futuras.

## Objetivo
O objetivo deste sistema é proporcionar uma ferramenta eficiente para a gestão médica de clínicas e hospitais. Através de uma interface intuitiva, o LABMedical busca facilitar acompanhamento de pacientes, fornecendo o cadastro de pacientes, de consultas e de exames acompanhamento de pacientes, consultas e exames.

## Tecnologias Utilizadas
- Framework Angular (com HTML, SCSS e TypeScript)
- Uso da biblioteca Angular Material para atribuição de estilos
- Uso da API ViaCEP para cadastro de endereço
- Uso do localStorage para armazenamento de dados
- Versionamento de código com GitHub
- Organização de tarefas com Trello, usando a metodologia de gestão de projetos Kanban

## Execução do Sistema
1. Clone o repositório do projeto do GitHub.
2. Instale as dependências do projeto utilizando o comando `npm install`.
3. Execute o projeto utilizando o comando `ng serve`.
4. Acesse o sistema através do navegador utilizando o endereço [http://localhost:4200]
- Também disponível através do navegador no endereço [https://lab-medical-sepia.vercel.app/]

## Melhorias Futuras
- Implementação da funcionalidade "Esqueceu sua senha".
- Substituição de alerts por toasts.
- Adição de mais estatísticas e informações relevantes na página inicial.
- Melhoria na validação de formulários e tratamento de erros, retornando com feedback visual o porque que um campo retorna inválido.
- Implementação de guarda-rotas.
- Implementação de responsividade, respeitando os conceitos de mobiles-first.
- Implementação de menu-lateral que se esconde e se mostra.
- Implementar @mixins nos scss que se repetem.
