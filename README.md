# Cashin

## Escopo do sistema
Um sistema de gerenciamento de vendas e estoque para comércios
 
## Features do Sistema
  - Criar, obter, editar e excluir produtos no banco de dados do comércio
  - Sistema de login em que cada comércio consegue acessar e gerenciar sua loja de forma independente
  - Lidar de armazenar o fluxo de caixa
  - Diferenciar usuários de caixa distintos

## Membros do time
 - Isabel Elise Silva Duque - Frontend
 - Kael Soares Augusto - Backend e Product Owner
 - Lucas Rios Bicalho - Backend e DataBase
 - Luiz Eduardo Penido - Fullstack e Scrum Master

## Tecnologias
 - Backend: Python utilizando MongoDB para gerenciamento e versionamento do banco de dados
 - Frontend: Angular

#

# Sprint 1

## Tarefas técnicas
- Estudo das ferramentas úteis para o fim do aplicativo de Angular [Isabel]
- Estudo das ferramentas úteis para o fim do aplicativo de MongoDB [Lucas]
- Configuração inicial da infraestrutura do aplicativo [Luiz]
- Planejamento das etapas do desenvolvimento do sprint [Kael]

## História 1: Eu como usuário de caixa, gostaria de logar no sistema com minhas credenciais
- Criação de usuários pre-definidos [Lucas]
- Rota de login com token authenticável [Luiz]
- Interface de login [Isabel]
- Configuração do Banco de Dados dentro do back-end [Kael]

## História 2: Eu como gerenciador de estoque, gostaria de cadastrar estoque novo
- Estrutura/tabelas do banco de dados [Lucas]
- Interface de cadastro de produtos [Isabel]
- Armazenamento e retirada do estoque [Kael]
- Retorno de ID único para cada produto cadastrado [Luiz]

## História 3: Eu como usuário de caixa, gostaria de encontrar informações de um produto dado o seu ID único
- Comunicação com o back-end para requisitar os dados [Kael]
- Interface de display de informações do produto [Isabel]

## História 4: Eu como usuário de caixa, gostaria de saber o total da compra após escanear X ítens.
- Adição do preço de produtos ao banco de dados [Lucas]
- Interface de display da compra final [Luiz]