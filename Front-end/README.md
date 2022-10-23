# Cashin demo

## Tela de Login

Na primeira vez que a aplicação é iniciada, não há usuários logados e portanto há o redirecionamento para a Tela de Login.

Para acessar a página principal é necessário inserir nos campos correspondentes o nome e a senha de um usuário registrado e então pressionar o botão 'Entrar'.

Os usuários e senhas atualmente são resgistrados e autenticados por meio do localStorage. As funções a seguir podem ser utilizadas no Console por meio do 'Inspecionar Elementos' para testar as funcionalidades de login:

- Registrar um novo usuário: 
  
  `ng.getComponent($('app-root')).register("nome-usuario","senha")`

- Mostrar usuários registrados:
  
  `ng.getComponent($('app-root')).show_users()`

- Deslogar:
  
  `ng.getComponent($('app-root')).logout()`

- Remover todos os usuários registrados:
  
  `ng.getComponent($('app-root')).clear_users()`


