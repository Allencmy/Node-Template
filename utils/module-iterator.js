const fs = require('fs');
const path = require('path');

module.exports = MI;

function MI(dir, fn) {
    fs
      .readdirSync(dir)
      .filter(file => file !== 'index.js')
      .forEach((file) => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
          MI(name, fn);
        } else {
          try {
            fn(name);
          } catch (e) {
            console.error('import module failed. ', 'name is ', name, 'error is ', e);
          }
        }
      });
}
