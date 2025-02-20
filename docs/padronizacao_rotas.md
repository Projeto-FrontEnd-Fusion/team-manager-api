# Padronização de rotas

O intuito deste documento é a padronização da criação de rotas da API, deixando mais claro e objetivo seguindo padrões pré-estabelecidos para melhor manutabilidade da API.

1. **Nomeclatura**:
    Quanto a nomeclatura de rotas, deve-se seguir um padrão onde declaramos qual será a ação executada e a qual entity se refere a ação, como exemplo, temos a atualização de dados da entidade `User`, logo tanto a nossa rota como o service deverão se chamar `updateUser`.

2. **Request, Response e StatusCode:**

    Teremos que definir qual será o tipo dos dados da requisição e da resposta, isso facilitará no desenvolvimento e tratamento de dados, já que o NestJs também conta com uma sistema de tratamento de dados onde ao tipar o Request, e o valor recebido seja diferente, um `UnprocessableEntityException` será retornado.

    Também deve-se definir qual o StatusCode esperado para o Response, seja em caso de falha ou não.

3. **Tratamento de Erros**:

    É importante que os erros sejam tratados, para melhor experiência do usuário e também para a vida útil da API, não queremos que nossa API trave e nem que o usuário receba um response com uma mensagem imprópria para a situação em questão.

    Uma boa forma de lidar com erros, é seguindo o Early Return Pattern, onde primeiramente iremos tratar dos possíveis erros que podem ocorrer, e apenas no final do fluxo da função iremos retornar o valor desejado.

4. **Testes**:

    > **TDD**: é uma metodologia de desenvolvimento de software que se baseia na escrita de testes automatizados antes de escrever o código. O objetivo é melhorar a qualidade do código desde o início do desenvolvimento.

    O TDD não é uma regra, mas sim uma orientação no desenvolvimento dessa API, visto que essa API está sendo desenvolvida por Juniors, é importante que testes sejam constantemente escritos, reescritos e aprimorados.

5. **Documentação**:

    Documentação é algo fundamental em todas aplicações, pois é a partir dela que tanto os atuais desenvolvedores, como também novos desenvolvedores irão se guiar para começar a continuar com o desenvolvimento da API, como estamos lidando com uma API em NestJs utilizando Swagger para documentação, a documentação deverá ser escrita utilizando os métodos do Swagger.
