# Metasky UI

This library helps users to integrate Metasky Wallet in your project. Metasky wallet supports
multiple blockchains and provide easy way to get started with integrating both custodial and non-custodial wallet with few lines of code.

## Installation

You can install this library via NPM or YARN.

#### NPM

```bash
  npm i metasky-js
```

#### YARN

```bash
  yarn add metasky-js
```

## Example Integration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Metasky</title>
    <script src="./dist/main.js"></script>
    <script>
      function openWallet() {
        var metasky = window.Metasky({ clubId: "YOUR CLUB ID" });
        metasky.open();
      }
    </script>
    <style>
      .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0px;
      }
    </style>
  </head>
  <body class="center">
    <button onclick="openWallet()">Open Wallet</button>
  </body>
</html>
```

## Available Methods

The `metasky-js` library exposes following methods to interact with wallet:

| Methods | Parameters                                          | Description                                  |
| ------- | --------------------------------------------------- | -------------------------------------------- |
| open    | (path: string)                                      | Opens the wallet on the specific path        |
| close   | none                                                | Hides the wallet from UI                     |
| on      | (event: string, handler: Function, options: Object) | Registers an event listener                  |
| off     | (event: string, handlerRef: Function)               | Removes an event listener                    |
| do      | (doOptions: DoOptions)                              | Perform action from set of supported actions |

## Feedback

If you have any feedback, please reach out to us at metasky-engineering@metasky.ai

## Contributions

If you have a feature request, please add it as an issue or make a pull request.

If you have a bug to report, please reproduce the bug in [CodeSandbox](https://codesandbox.io/s/pensive-pasteur-mntw6g) to help us easily isolate it.
