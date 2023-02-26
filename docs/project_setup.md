# SETUP TODO

- [x] - install development environment -> Vite js
- [x] - npm package init
- [x] - install dependencies
  - [x] Promise based http client -> axios
  - [x] CSS framework -> TailwindCSS
  - [x] pre-commit hooks -> Husky
  - [x] linter
  - [x] formatter -> prettier
- [x] - setup pre-commit hooks
- [] - complete README

# STEP-BY-STEP

## install development environment

```
npm create vite@latest
```

[Source](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

## npm package init

No need to init npm first as it's done by the Vite installer.

```
npm install
```

If you want to run your project from GitHub Codespaces, add the following line to package.json
inside the `scripts` object.

```
"git": "vite --host",
```

## Install dependencies

### TailwindCSS

1. Install packages

```
npm install -D tailwindcss postcss autoprefixer
```

2. Create config files

```
npx tailwindcss init -p
```

3. Update config files so Tailwind knows what files should be processed

```
content: ["./src/**/*.{html,js}"],
```

4. Add the Tailwind directives to your CSS

```
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[Source](https://tailwindcss.com/docs/installation/using-postcss)

### Axios

```
npm install axios
```

### lint-staged

```
npm install --save-dev lint-staged
```

[Source](https://www.npmjs.com/package/lint-staged/v/7.3.0)

### prettier

```
npm install --save-dev --save-exact prettier
```

Then, create an empty config file to let editors and other tools know you are using Prettier:

```
echo {}> .prettierrc.json
```

Then, modify the file to contain:

```
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false
}
```

Then, create rules for prettier which files should it ignore

```
touch .prettierignore
```

Then, modify the file to contain:

```
# Ignore artifacts:
build
coverage
```

[Source](https://prettier.io/docs/en/install.html)

### Husky

Now, let's create a pre-commit hook which will run before every git commit.
In this case, we want to keep the code consistent and without mistakes so we
enforce to run linter and prettier.

```
npx husky-init
npm install
```

Create pre-commit hook

```
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit
```

Inside .husky directory, you should find a file called pre-commit which
should containt the following

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged

```

Finally, we update package.json with

```
  "lint-staged": {
    "*.{html,js,css,md,json}": "prettier --write"
  },
```

[Source](https://typicode.github.io/husky/#/)
