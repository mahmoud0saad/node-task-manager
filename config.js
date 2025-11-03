require('dotenv').config();
const path = require('path');

module.exports = {
    PORT: process.env.PORT || 3001,
    DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/testdb',
    I18N: {
        fallbackLng: 'en',
        preload: ['en', 'ar'],
        loadPath: path.join(__dirname, 'locales/{{lng}}/translation.json')
    }
};
