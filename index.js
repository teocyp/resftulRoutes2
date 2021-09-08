/*
GET /comments - List all comments
POST /comments - Createe a new comment
GET /comments/:id - Get one comment (using ID)
PATCH /comments/:id - Update one comment
DELETE /comments/:id - Destroy (delete) one comment
*/

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Kim',
        comment: 'LWhat upppp?'
    },
    {
        id: uuid(),
        username: 'Jason',
        comment: 'Gemmir nach Kaufleute?'
    },
    {
        id: uuid(),
        username: 'Teo',
        comment: 'Bring it upside down!'
    }
]


app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
})