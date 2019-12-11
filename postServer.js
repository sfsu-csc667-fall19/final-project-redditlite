const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');
const postService = require('./services/postService');

const port = 3001;

//app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

/*Function to authenticate user (to be used as middleware)*/
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
        if (result.status === 200){ //Valid user
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
                reason: "Forbidden!", code: 403
            }
        });
    })
};

/* Used to make new posts
    Intended JSON to include in request: 
    {
	"post": {
		"title": "Post_Name",
		"text": "Post_Body"
	    }
    }  
*/
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
        req.body.post.author = req.body.user._id; 
        const newPost = await postService.createPost(req.body.post);
        console.log(newPost);
        res.data = {'post': newPost};
        return res.status(res.statusCode || 200)
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

/* Used to edit posts - Only passed in properties sent in body will be updated
Intended JSON to include in request: 
    {
	"post": {
		"title": "Post_Name",
		"text": "Post_Body"
	    }
    } 
*/
app.post('/api/posts/edit', authentication, async (req, res) => {
    try{
        if (!req.body.post) {
            return res.status(400).send({
                ok: false,
                error: {
                    reason: "Expected a new post object", code: 400
                }
            });
        }
        
        const updatedPost = await postService.updatePost(req.body.post);
        console.log(updatedPost);
        res.data = {'post': updatedPost};

        return res.status(res.statusCode || 200)
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

/*
Finds all posts with the properties included, returns an array of post objects
Intended JSON to include in request: 
{
	"post": {
		"title": Post_Name,
        "text": Post_Body,
        "author": Author_ID,
        "_createdAt": Date
	    }
} 
*/

app.post('/api/posts/findposts', async (req, res) => {
    try{
        if (!req.body.post){
            return res.status(400).send({
                ok: false,
                error: {
                    reason: "No postObj provided", code: 400
                }
            });
        }

        const postResults = await postService.findAllPost(req.body.post);
        console.log(postResults);
        res.data = {'posts': postResults};

        return res.status(res.statusCode || 200)
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

/*
Finds one post with the properties included, returns a post object
Intended JSON to include in request: 
{
	"post": {
		"title": Post_Name,
        "text": Post_Body,
        "author": Author_ID,
        "_createdAt": Date
	    }
} 
*/

app.post('/api/posts/findpost', async (req, res) => {
    try{
        if (!req.body.post){
            return res.status(400).send({
                ok: false,
                error: {
                    reason: "No postObj provided", code: 400
                }
            });
        }

        const postResult = await postService.findOnePost(req.body.post);
        console.log(postResult);
        res.data = {'post': postResult};

        return res.status(res.statusCode || 200)
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

/*
Finds one post with the postID included, returns a post object
Include postID as parameter in get request
*/

app.get('/api/posts/getpost/:id', async (req, res) => {
    try{
        if (!req.params.id){
            return res.status(400).send({
                ok: false,
                error: {
                    reason: "No postID provided", code: 400
                }
            });
        }
        console.log(req.params.id)
        let postResult = await postService.getPostById(req.params.id);
        res.data = {'post': postResult};

        return res.status(res.statusCode || 200)
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