const models = require('../../models');

var username = '';

exports.getUsername = (name) => {
    console.log(name);
    username = name;
    exports.username = username;
};

exports.createPost = (res, title, content, author) => {
    models.post
        .create({
            title,
            author,
            content,
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: '포스트 작성 실패',
                err,
            });
        });
};

exports.readAllPost = (res) => {
    models.post
        .findAll({
            where: { author: username },
        })
        .then((posts) => {
            res.render('index', {
                isToken: true,
                username,
                posts,
            });
        });
};

exports.readOnePost = (res, id) => {
    models.post
        .findOne({
            where: { author: username, id },
        })
        .then((post) => {
            res.render('post/updatePost', {
                post,
            });
        });
};

exports.updatePost = (req, res, id, title, content) => {
    models.post
        .update(
            {
                title,
                content,
            },
            {
                where: { id },
            }
        )
        .then(() => {
            res.redirect('/');
        });
};

exports.deletePost = (res, id) => {
    models.post
        .destroy({
            where: { id },
        })
        .then(() => {
            res.redirect('/');
        });
};
