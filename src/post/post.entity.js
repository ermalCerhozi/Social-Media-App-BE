"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostEntity = void 0;
var typeorm_1 = require("typeorm");
var comment_entity_1 = require("../comment/comment.entity");
var user_entity_1 = require("../user/user.entity");
var vote_entity_1 = require("../vote/vote.entity");
var swagger_1 = require("@nestjs/swagger");
var PostEntity = /** @class */ (function (_super) {
    __extends(PostEntity, _super);
    function PostEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], PostEntity.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], PostEntity.prototype, "imageUrl");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], PostEntity.prototype, "description");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.Column)()
    ], PostEntity.prototype, "noComment");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.CommentEntity; }, function (comment) { return comment.post; })
    ], PostEntity.prototype, "comments");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.UserEntity; })
    ], PostEntity.prototype, "user");
    __decorate([
        (0, swagger_1.ApiProperty)(),
        (0, typeorm_1.OneToMany)(function () { return vote_entity_1.VoteEntity; }, function (vote) { return vote.post; })
    ], PostEntity.prototype, "votes");
    PostEntity = __decorate([
        (0, typeorm_1.Entity)('post')
    ], PostEntity);
    return PostEntity;
}(typeorm_1.BaseEntity));
exports.PostEntity = PostEntity;
