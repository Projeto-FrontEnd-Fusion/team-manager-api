# Documentação de Estrutura de Dados - backend

[Dados dos Membros](https://www.notion.so/Documenta-o-de-Estrutura-de-Dados-backend-14e52ce82b9f80fa8c58f191de9a8113?pvs=21)

## Visão Geral

Esta documentação descreve a estrutura de dados que representa as informações dos membros do portoflio colaborativo. Cada propriedade da estrutura contém informações detalhadas sobre o perfil, habilidades, projetos e competências do profissional. A estrutura é formada por diferentes tipos de dados como strings, arrays e objetos, conforme especificado abaixo.

[Acesse o gist](https://gist.githubusercontent.com/dinhoSilwa/15d2e2631f53748f39dfe191c30aabf7/raw/539c5e98d9a2b4b40086d922fb439452fc3b3ace/.json)

---

## Propriedades

### 1. `name`

- **Tipo de dado**: `string`
- **Descrição**: Representa o nome do profissional.
- **Valor**: `"John Doe"`

### 2. `professional_profile_url`

- **Tipo de dado**: `array` (lista de objetos)
- **Descrição**: Contém uma lista de URLs para os perfis profissionais do usuário em diferentes plataformas (ex: GitHub, LinkedIn).
- **Estrutura do objeto**:
    - `platform`: `string` – Nome da plataforma (ex: `"GitHub"`, `"LinkedIn"`)
    - `url`: `string` – URL do perfil na plataforma.
- **Exemplo**:
    
    ```json
    [
      { "platform": "GitHub", "url": "<https://github.com/johndoe>" },
      { "platform": "LinkedIn", "url": "<https://linkedin.com/in/johndoe>" }
    ]
    ```

### 3. `stack`

- **Tipo de dado**: `string`
- **Descrição**: Indica a área de especialização do profissional, como "frontend", "backend" ou "full-stack".
- **Valor**: `"backend"`

### 4. `community_level`

- **Tipo de dado**: `string`
- **Descrição**: Refere-se ao nível de envolvimento ou reconhecimento do profissional dentro da comunidade técnica.
- **Valor**: `"code wizard"`

### 5. `current_squad`

- **Tipo de dado**: `string`
- **Descrição**: Representa o nome do time ou equipe na qual o profissional está atualmente trabalhando.
- **Valor**: `"X-mens"`

### 6. `skills`

- **Tipo de dado**: `array` (lista de strings)
- **Descrição**: Lista de habilidades técnicas do profissional.
- **Exemplo de valores**: `"HTML"`, `"CSS"`, `"JavaScript"`, `"React"`, `"Node.js"`, `"Git"`, `"Docker"`
- **Exemplo**:
    
    ```json
    [
      "HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Docker"
    ]
    ```

### 7. `projects`

- **Tipo de dado**: `array` (lista de objetos)
- **Descrição**: Contém informações sobre os projetos desenvolvidos pelo profissional.
- **Estrutura do objeto**:
    - `project_name`: `string` – Nome do projeto.
    - `description`: `string` – Descrição breve sobre o projeto.
    - `technologies_used`: `array` – Lista de tecnologias usadas no projeto.
    - `project_url`: `string` – URL para o repositório ou site do projeto.
- **Exemplo**:
    
    ```json
    [
      {
        "project_cover": "https://project1.pg",
        "project_name": "Personal Portfolio",
        "description": "A personal portfolio website built with React and hosted on GitHub.",
        "technologies_used": ["React", "CSS", "JavaScript"],
        "project_url": "<https://github.com/johndoe/portfolio>"
      },
      {
        "project_cover": "https://project1.pg",
        "project_name": "E-commerce Website",
        "description": "An online store platform with payment integration, built with Node.js and MongoDB.",
        "technologies_used": ["Node.js", "Express", "MongoDB"],
        "project_url": "<https://github.com/johndoe/ecommerce>"
      }
    ]
    ```

### 8. `softskills`

- **Tipo de dado**: `array` (lista de strings)
- **Descrição**: Lista de habilidades interpessoais e comportamentais do profissional.
- **Exemplo de valores**: `"Communication"`, `"Problem-solving"`, `"Teamwork"`, `"Adaptability"`, `"Time management"`
- **Exemplo**:
    
    ```json
    [
      "Communication", "Problem-solving", "Teamwork", "Adaptability", "Time management"
    ]
    ```

---

## Exemplos de Uso

Aqui está um exemplo completo de como todos os dados podem ser estruturadosem JSON:

```json
{
  "name": "John Doe",
  "professional_profile_url": [
    { "platform": "GitHub", "url": "<https://github.com/johndoe>" },
    { "platform": "LinkedIn", "url": "<https://linkedin.com/in/johndoe>" }
  ],
  "stack": "backend",
  "community_level": "code wizard",
  "current_squad": "X-mens",
  "skills": [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Docker"
  ],
  "projects": [
    {
      "project_name": "Personal Portfolio",
      "description": "A personal portfolio website built with React and hosted on GitHub.",
      "technologies_used": ["React", "CSS", "JavaScript"],
      "project_url": "<https://github.com/johndoe/portfolio>"
    },
    {
      "project_name": "E-commerce Website",
      "description": "An online store platform with payment integration, built with Node.js and MongoDB.",
      "technologies_used": ["Node.js", "Express", "MongoDB"],
      "project_url": "<https://github.com/johndoe/ecommerce>"
    }
  ],
  "softskills": [
    "Communication", "Problem-solving", "Teamwork", "Adaptability", "Time management"
  ]
} 
