# portfolio
Simple Node based front end development boilerplate I put together to build out my portfolio http://martinalcock.co.uk

## Features:
### Development

* Zurb Foundation for rapid devlopment
* Sass with sourcemaps for debugging
* Pug for building views

* Currently no JS abstraction like CoffeeScript as you only have to end up debugging in JS anyway

### Build
* Compresses images using imagemin
* Compiles Pug views to HTML
* Compiles Sass to minified CSS
* Copies all JS and other supporting files over to build folder

### Deployment
* Simple deployment to a server via FTP using a config.json file which is excluded in the .gitignore

Config.json example

```javascript
{
    "host":     "ftp.yoursite.com",
    "user":     "username",
    "password": "password"
}
```

Also includes some working files 