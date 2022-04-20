"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var user_module_1 = require("./user/user.module");
var typeorm_1 = require("@nestjs/typeorm");
var post_module_1 = require("./post/post.module");
var comment_module_1 = require("./comment/comment.module");
var vote_module_1 = require("./vote/vote.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forRoot(), user_module_1.UserModule, post_module_1.PostModule, comment_module_1.CommentModule, vote_module_1.VoteModule]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
