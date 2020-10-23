const mongoose = require('mongoose')

const GigSchema = new mongoose.Schema(
    {
        group: {type: String, required: true},
        location: String,
        time: String,
        link: String,
        support: String,
        hidden: {type: Boolean}

    }


)

const Gig = mongoose.model('Gig', GigSchema)

module.exports = Gig