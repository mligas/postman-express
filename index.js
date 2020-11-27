const express = require('express')
const cors = require('cors')
const app = express()
const port = 4400
const fs = require('fs')

app.use(cors())

const toExpParam = (arr) => {
    return arr.map(p => {
        if(/^{{.*}}$/.test(p)) {
            let r = p.match(/^{{(.*)}}$/);
            return `:${r[1]}`
        }
        return p;
    })
}

fs.readdir('./collections', (err, files) => {
    if(err) return console.error(err);

    let compiledCollection = [];

    files.forEach(file => {
        if(!file.endsWith('.json')) return;
        try {
            let raw = fs.readFileSync(`./collections/${file}`);
            let collection = JSON.parse(raw);
            compiledCollection = [...compiledCollection, ...collection.item];
        } catch (error) {
            console.error(error)
        }
    });

    console.log(`Detected ${compiledCollection.length} routes to mount.`);

    compiledCollection.forEach(route => {
        if(!route) return;
        let method = route.request.method;
        let path = toExpParam(route.request.url.path);

        console.log('Mounting route : ', method, `/${path.join('/')}`);

        app[method.toLowerCase()](`/${path.join('/')}`, (req, res) => {
            res.json(JSON.parse(route.response[0].body))
        });
    });

    app.listen(port, () => {
        console.log(`Running http://localhost:${port}`)
    });
});