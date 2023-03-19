const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ieadeleke:biochemistry@cluster0.yrxma.mongodb.net/funkyapp?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log(err))

let templatesSchema = new mongoose.Schema({
    name: String,
    location: String,
    description: String,
    category: String,
    tags: Array,
    jsonCode: JSON,
    svgCode: String,
    date: {
        type: Date,
        default: new Date()
    }
});

let usersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    designs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designs'
    }],
    youtubeAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        refs: 'youtubeAccounts'
    }]
});
let designSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    location: String,
    svgCode: JSON,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
})
let youtube_accountsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: String,
    email: String,
    picture: String,
    refresh_token: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'Users'
    }
})

module.exports = {
    users: mongoose.model('Users', usersSchema),
    templates: mongoose.model('Templates', templatesSchema),
    Designs: mongoose.model('Designs', designSchema),
    youtube_accounts: mongoose.model('youtube_accounts', youtube_accountsSchema),
}