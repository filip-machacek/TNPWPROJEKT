const mongoose = require('mongoose');
const Contact = require('../models/contact');
const User = require('../models/user');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect('mongodb://127.0.0.1:27017/contactsApp')
    .catch((error) => console.log(error));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('Database connected');
});

const contacts = [
    {
        name: 'František',
        surname: 'Vomáčka',
    },
    {
        name: 'Jan',
        surname: 'Novák',
        email: 'jan@novak.cz',
        note: 'Vedoucí oddělení'
    }
];

const seedDB = async () => {
    const username = 'demo';
    const email = 'demo@demo.cz';
    const password = 'demo';

    const user = new User({ username, email });
    const id = user._id;
    await User.register(user, password);

    for (let c of contacts) {
        const contact = new Contact(c);
        contact.owner = id;
        await contact.save();
    }
};

seedDB()
    .then(() => {
        mongoose.connection.close();
        console.log('Writing to DB successful, DB disconnected');
    })
    .catch((err) => {
        console.log('Error while writing to DB');
    });
