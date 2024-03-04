const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(
    'mongodb+srv://aashutoshking12:nepalihami123456@cluster0.sbh7tji.mongodb.net/'
)
    .then(() => console.log('mongodb is connected'))
    .catch((e) => console.log(e));