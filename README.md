# cuong-mmo

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### Step to setup environment for this project !!!;

**_ Flow Electron _**
Client Gửi request tới payload sau đó payload gửi về cho mainProcess xử lý sau khi xử lý xong gửi ngược về renderer để render cho user !!

1. using Electron Quick Start With Vite (Vite is builder ) to create project !! => This setup using react , typescript , taiwindcss

- npm create @quick-start/electron@latest;

2. Setup môi trường và structure dự án

-
