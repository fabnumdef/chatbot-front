<p align="center">
  <a href="https://chatbot.fabnum.fr" target="blank"><img src="https://chatbot.dev.fabnum.fr/assets/img/logo_fabrique_chatbot.svg" width="320" alt="Logo Fabrique à chatbots" /></a>
</p>

## Chatbot - FRONT

L’objectif de la ‘Fabrique à chatbots’ est de détailler les étapes de réalisation d’un chatbot — de l’identification d’un cas d’usage, à la mise en place de l’interface du chatbot — afin de ne pas créer de ruptures dans l’expérience utilisateur, et de fournir les documents/code/template utiles pour la réalisation d’un chatbot.

Ce service est un guide pour la définition d’une problématique de diffusion d’informations se prêtant à une solution « chatbot ».

C’est également une aide pratique pour la constitution d’une base documentaire (template excel) où sont consignées les questions/réponses du chatbot, et pour la réalisation de l’interface qui permet de créer et maintenir le chatbot (back office pour mise à jour de la base documentaire).

### Architecture

Frontend sous [Angular 15](https://angular.io/docs) couplé à [Angular Material](https://material.angular.io/).

Tests réalisés avec [Cypress](https://docs.cypress.io/).

| Repo Git           | URL                                                   | Technologies | Description                        |
| ------------------ | ----------------------------------------------------- |--------------| ---------------------------------- |
| Fabrique - Front   | https://github.com/fabnumdef/fabrique-chatbot-front   | Angular 15   | Front du site de la Fabrique       |
| Fabrique - Back    | https://github.com/fabnumdef/fabrique-chatbot-back    | NestJS 9     | Back du site de la Fabrique        |
| Chatbot - Front    | https://github.com/fabnumdef/chatbot-front            | Angular 15   | Front des Backoffices des chatbots |
| Chatbot - Back     | https://github.com/fabnumdef/chatbot-back             | NestJS 9     | Back des Backoffices des chatbots  |
| Chatbot - Template | https://github.com/fabnumdef/chatbot-template         | RASA 3.4.0   | Template RASA des chatbots         |

### Utilisation

1. Cloner le repo et `cd` dedans
2. `cp env.example .env`
3. Editer le fichier `.env`
4. `npm install`
4. `npm run build:prod`
5. `npm run start`

### Tests

// TODO

## Restons en contact

- Site web - [https://chatbot.fabnum.fr](https://chatbot.fabnum.fr/)
- Auteurs - [Beta.gouv](https://beta.gouv.fr/startups/fabrique-chatbots.html)

## License

[MIT licensed](LICENSE).
