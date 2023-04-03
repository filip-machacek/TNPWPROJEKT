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
        name: 'Pavel',
        surname: 'Horák',
        email: 'paho@seznam.cz',
        phone: '+420722129139',
        street: 'Riegrova',
        house_number: 352,
        city: 'Kolín',
        postcode: '28002',
        position: 'Operátor logistiky',
        company: 'Adient s.r.o.',
        department: 'Logistika',
        note: ''
    },
    {
        name: 'Jakub',
        surname: 'Blažek',
        email: 'jakuba@gmail.com',
        phone: '+420723705626',
        street: 'Klimenta Čermáka',
        house_number: 990,
        city: 'Čáslav',
        postcode: '28601'
    },
    {
        name: 'Petr',
        surname: 'Soukup',
    },
    {
        name: 'Josef',
        surname: 'Mareček',
        email: 'marejo@email.cz',
        phone: '+420770524741',
        street: 'Kovářská',
        house_number: 1061,
        city: 'Petrovice',
        postcode: '40337',
        note: ''
    },
    {
        name: 'Vladimíra',
        surname: 'Bělíková',
        email: 'vladka.belikova@gmail.com',
        position: 'Recepční',
        company: 'Hotel Hradec',
        department: '',
        note: ''
    },
    {
        name: 'Miloš',
        surname: 'Pošta',
        email: 'posta@centrum.cz',
        phone: '+420574736715',
        street: 'Pardubická',
        house_number: 15,
        city: 'Želechovice nad Drevnicí',
        postcode: '76311'
    },
    {
        name: 'Jiří',
        surname: 'Horáček',
    },
    {
        name: 'Renata',
        surname: 'Tomášová',
        email: 'renaa.tomasova@centrum.cz',
        phone: '+420772949072',
        street: 'Lomená',
        house_number: 1555,
        city: 'Uherčice u Znojma',
        postcode: '67107',
        note: 'Sestra od Franty Vomáčky'
    },
    {
        name: "Anna",
        surname: "Nováková",
        email: "anna.novakova@email.cz",
        phone: "+420731234567",
        street: "Hlavní",
        house_number: 456,
        city: "Praha",
        postcode: "10000",
        note: "Pracuje v IT"
    },
    {
        name: "Jiří",
        surname: "Svoboda",
        email: "jiri.svoboda@email.cz",
        phone: "+420608765432",
        street: "Vrchlického",
        house_number: 12,
        city: "Brno",
        postcode: "60200",
        note: "Sportovec"
    },
    {
        name: "Marie",
        surname: "Procházková",
        email: "marie.prochazkova@email.cz",
        phone: "+420777123456",
        street: "Jana Palacha",
        house_number: 78,
        city: "Olomouc",
        postcode: "77900",
        note: "Učitelka"
    },
    {
        name: "Tomáš",
        surname: "Novotný",
        email: "tomas.novotny@email.cz",
        phone: "+420603987654",
        street: "Masarykova",
        house_number: 5,
        city: "České Budějovice",
        postcode: "37001",
        note: "Architekt"
    },
    {
        name: "Lucie",
        surname: "Kovářová",
        email: "lucie.kovarova@email.cz",
        phone: "+420721456789",
        street: "Národní",
        house_number: 8,
        city: "Hradec Králové",
        postcode: "50001",
        note: "Lékárnice"
    },
    {
        name: "Jakub",
        surname: "Bartoš",
        email: "jakub.bartos@email.cz",
        phone: "+420604321098",
        street: "Rooseveltova",
        house_number: 22,
        city: "Plzeň",
        postcode: "30100",
        note: "Mladý podnikatel"
    },
    {
        name: "Petra",
        surname: "Dvořáková",
        email: "petra.dvorakova@email.cz",
        phone: "+420731789012",
        street: "Jungmannova",
        house_number: 33,
        city: "Liberec",
        postcode: "46001",
        note: "Umělkyně"
    },
    {
        name: "Martin",
        surname: "Kříž",
        email: "martin.kriz@email.cz",
        phone: "+420721234567",
        street: "Bezručova",
        house_number: 9,
        city: "Česká Lípa",
        postcode: "47001",
        note: "Kuchař"
    },
    {
        name: 'Lenka',
        surname: 'Drahošová',
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
        console.log(err);
    });
