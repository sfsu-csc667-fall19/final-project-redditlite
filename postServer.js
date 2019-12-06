const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const postService = require('./services/postService');

const port = 3001;

app.use(bodyParser.json());

const authentication = function(req, res, next){
    const apiUrl = req.originalUrl;
    const httpMethod = req.method;

    console.log(httpMethod, apiUrl);

    axios('http://localhost:3000/api/auth/verify', {
        method: 'POST',
        headers: {
            cookie: req.headers.cookie
        }
    }).then(result => {
        if (result.status === 200){
            //Valid user
            req.user = result.data.response.user;
            res.cookie('auth', JSON.stringify(result.data.response));
            next();
        } else{
            return res.status(403).send({
                ok: false,
                error: {
                    reason: "Forbidden!", code: 403
                }
            });
        }
    }).catch(err => {
        console.log(err);
        return res.status(403).send({
            ok: false,
            error: {
                reason: "Auth server could not be reached!", code: 403
            }
        });
    })
};

app.post('/api/posts/new', authentication, async (req, res) => {
    try{
        if (!req.body.post) {
            return res.status(400).send({
                ok: false,
                error: {
                    reason: "Expected a new post object", code: 400
                }
            });
        }
        req.body.post.author = req.user._id
        const newPost = await postService.createPost(req.body.post);
        console.log(newPost);
        res.data = {'post': newPost};

        res.status(res.statusCode || 200)
            .send({
                ok: true,
                response: res.data
            });
    } catch(err){
        console.log(err);
        return res.status(400).send({
            ok: false,
            err: {
                reason: "Bad Request", code: 400
            }
        });
    }
});

// Block other endpoints
app.all('*', (req, res, next) => {
    if (!req.session || !req.sessionId) {
        return res.status(404).send({
            ok: false,
            error: {
                reason: "Not Found",
                code: 404
            }
        });
    }
});


app.listen(port, () => console.log(`PostServer listening on port ${port}!`))