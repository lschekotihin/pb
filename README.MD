![logo](https://user-images.githubusercontent.com/49872695/56986222-e2718b00-6b92-11e9-83b5-5e201a78abdd.png)

# PromiseBreak

## Description
Pb is little, but powerfull utility module made to close some gaps in JavaScript Promises.
Please feel free to provide any requests to new functionality.
It is based on https://github.com/petkaantonov/bluebird/issues/581 issue.

## Usage

### Installation
```bash
    $ npm install --save promise-break
```

```javascript
    const pb = require('promise-break');
```

### Wrapping
To make magic work you need to wrap over Promise callbacks with ```pb``` at least at one level lower then you planing to pass flow control commands and to the end of chain.
But it is better for code maintance to wrap all callbacks at once.

```javascript
    db.getData()
    .then(pb((data) => {
    }))
    .then(pb(() => {
    }))
    .then(pb(() => {
    }))
    .catch((error) => {
        console.error(error);
    });
```

### Break Promise
If you need to break a chain of promises

```javascript
    db.getData()
    .then(pb((data) => {
        if (!data.someCheck()) {
            tellSomeone();

            // All other '.then' calls will be skiped
            return pb.BREAK;
        }
    }))
    .then(pb(() => {
    }))
    .then(pb(() => {
    }))
    .catch((error) => {
        console.error(error);
    });
```

### Skip Next Promise
If you decided to use one call in chain only in some cases.

```javascript
    db.getData()
    .then(pb((data) => {
        if (!data.needSomeMoreDBWork) {
            // Next '.then' call will be skiped
            return pb.SKIP_NEXT;
        }
    }))
    .then(pb(() => {
        return db.doMoreStuff();
    }))
    .then(pb(() => {
    }))
    .catch((error) => {
        console.error(error);
    });
```
