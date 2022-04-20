"use strict";
exports.__esModule = true;
exports.setupSwagger = void 0;
var swagger_1 = require("@nestjs/swagger");
var environment_1 = require("./environment/environment");
function setupSwagger(app) {
    var config = new swagger_1.DocumentBuilder()
        .setTitle('Blog API')
        .setDescription('Blog internship rest api for Thoma Karakashi')
        .setVersion('1.0.0')
        .build();
    swagger_1.SwaggerModule.setup(environment_1.environment.server.prefix, app, swagger_1.SwaggerModule.createDocument(app, config));
}
exports.setupSwagger = setupSwagger;
