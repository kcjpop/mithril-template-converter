# Mithril HTML to JavaScript converter

A fork from [ArthurClemens/mithril-template-converter](https://github.com/ArthurClemens/mithril-template-converter).

Live version: [http://kcjpop.github.io/mithril-template-converter](http://kcjpop.github.io/mithril-template-converter)


## What are the differences?

+ Option to switch between single quotes and double quotes
+ Option to pass children nodes as an array or spread params
+ New UI

## Call from script

```javascript
import templateBuilder from "app/converter/template-builder"
const source = "<hr/>"
const output = templateBuilder({
	source
})
```


## Updating code

Requires babel and uglifyjs.

es6 modules are transpiled to es5 using either:

* `npm run transpile`
* `npm run watch`


## Tests

Run `tests/testrunner.html` in a browser.

Update test code, transpile (see above), run test.
