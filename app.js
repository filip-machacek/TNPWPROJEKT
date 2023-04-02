const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const ExpressError = require('./utils/ExpressError');
const contactsRouter = require('./routes/contacts');
const userRouter = require('./routes/user');
const User = require('./models/user');


const PORT = 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect('mongodb://127.0.0.1:27017/contactsApp')
    .catch((error) => console.log(error));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const sessionConfig = {
    secret: 'YnRnMLBixZNYbV0',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// fake user registration
/*app.get('/fakeUser', async (req, res) => {
   const user = new User({ email: 'dd@dd.com', username: 'ddd' });
  const newUser = await User.register(user, 'mypassword');
  res.send(newUser);
}); */

app.use('/', userRouter);
app.use('/contacts', contactsRouter);

app.all('*', (req, res, next) => {
    const err = new ExpressError('Stránka nenalezena', 404);
    next(err);
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Něco se pokazilo';
    }
    res.status(statusCode).render('error', { err });
});

app.listen(PORT, () => {
    console.log(`Server is running and listening at port ${PORT}`);
});
