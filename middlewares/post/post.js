const models = require('../../models');

var username = '';

exports.getUsername = (name) => {
    console.log(name);
    username = name;
    exports.username = username;
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
