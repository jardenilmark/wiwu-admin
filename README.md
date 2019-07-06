# wiwu-admin

the web admin side of weee wooo

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installation

### Requirements:

- [NodeJS](https://nodejs.org/en/) (>= v11.15)
- [Yarn](https://yarnpkg.com/en/) (>= v1.17)
- [Commitizen CLI](https://github.com/commitizen/cz-cli)

Clone project:

```bash
git clone git@gitlab.com:team-weee-wooo/wiwu-admin.git
cd wiwu-user
```

Install dependencies & run:

```bash
yarn
yarn start
```

Starting development:

```bash
# create a new branch
git checkout -b name-here/dev
```

##### IMPORTANT: Please only use [yarn](https://yarnpkg.com/en/) as the package manager to prevent conflicts.

## Style Guide

This project is using the [Standard Style](https://standardjs.com/) style guide.  
Although the project has [ESlint](https://eslint.org/) set up, staged files are automatically formatted with [Prettier](https://prettier.io/):

```bash
# manual formatting of all files instead of the pre-commit hook:
yarn run prettier

# manual formatting of staged files instead of the pre-commit hook:
npx pretty-quick
```

## Conventions

### Git Commit Guidelines

To automatically format `git commit` messages, we'll use `git cz` instead of `git commit`.
This is done via [Commitizen](https://github.com/commitizen/cz-cli).

#### Installation & Usage

```bash
# install cz-cli
npm install commitizen -g

# commit changes with
git cz
```

##### NOTE: Please see [Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) for the description of each commit message types.

## Documentation

This project is set up with [React Styleguidist](https://react-styleguidist.js.org/) to document components, functions, etc. Please see the [documenting guide](https://react-styleguidist.js.org/docs/documenting.html) to learn how to document components, functions, etc.

## Stack

Please list the frameworks, packages, and tools you used in this project:

- React (CRA)
- Commitizen
- React Styleguidist
- React Router (web)
- ESLint (Standard Style)
- Prettier

## Authors

- Ronna Mae Firmo
- Mark Jardenil
- Danddie Porras
- Jess Virgil Lanchinebre
- Alfie Arcede
