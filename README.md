# Bootstrap 4 example with React, MobX and MDBootstrap (mdbreact)
Example implementation of rate exchange view / edit:
* [react](https://reactjs.org/)
* [typescript](https://www.typescriptlang.org/)
* [mobx](https://mobx.js.org/)
* [mobx-react-form](https://github.com/foxhound87/mobx-react-form)
* [superagent](https://github.com/visionmedia/superagent)
* [mdbreact](https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design)

It's based on `create-react-app`.

![](docs/images/exchange-rate-list.png?raw=true)

![](docs/images/exchange-rate-edit.png?raw=true)

## Goals

Project aims to experiment with `Bootsrtap 4` as a base for layout components. It picks `MDBootstrap` in order to verify library maturity.


## How to run

* `npm install` or `yarn`
* `npm start` or `yarn start`

## Tests

* `npm run jest` or `yarn run jest`

## Further steps

Project is still open for improvements. Here are some ideas:

* `mdbreact` proved to have some issues while working with form components, try next releases.
* Consider tighter separation of UI and business logic concerns:
  * Define clear rules on where to place and how to structure models for API, views and CRUD operations.
  * Define base classes for reusable UI behavior like sorting.
* Dive more into generic classes and interfaces.
