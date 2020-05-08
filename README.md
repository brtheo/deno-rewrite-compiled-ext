# Rewrite file extension of imported module after typescript compilation
## Description
It rewrites the extension of imported `.ts` module with correct `.js` extension once it's compiled. 

Also write the files, keeping directory struuctures.
## Usage
```typescript
// build.ts
import rewriteCompiledExt from 'hhttps://raw.githubusercontent.com/brtheo/deno-rewrite-compiled-ext/master/mod.ts'
const [diagnostics, emitMap] = await Deno.compile('./file.ts', sources, options)
rewriteCompiledExt(emitMap)
```
Then run the command 
```
deno run --allow-write --allow-read --unstable build.ts
```
Leading to the following 
```typescript
// file.ts
import someModule from './some/directory/module.ts'
import {bar, baz} from '.module2.ts'
import * as foobar from '.module3.ts'
import './module4.ts'

// compiled file.js
import someModule from './some/directory/module.js'
import {bar, baz} from '.module2.js'
import * as foobar from '.module3.js'
import './module4.js'
```

