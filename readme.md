# Parity keys

```js
const ParityKeys = require('parity-keys')

const parityKeys = new ParityKeys({
	dataDir: '/var/.parity',
	chainName: 'DevelopmentChain',
})

const keys = parityKeys.get(
	'0x9bdd7644516b0454fd0cfcb473e51109a3106835', 
	'passwordForTheAccount'
)
```