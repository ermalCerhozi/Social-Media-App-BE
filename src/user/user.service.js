"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var user_repository_1 = require("./user.repository");
var typeorm_1 = require("@nestjs/typeorm");
var google_auth_library_1 = require("google-auth-library");
var environment_1 = require("../environment/environment");
var user_entity_1 = require("./user.entity");
var logged_users_1 = require("./logged-users");
var user_role_enum_1 = require("../shared/enums/user-role.enum");
var UserService = /** @class */ (function () {
    function UserService(userRepository) {
        this.userRepository = userRepository;
        this.oAuth2Client = new google_auth_library_1.OAuth2Client({
            clientId: environment_1.environment.google.clientId,
            clientSecret: environment_1.environment.google.secret
        });
    }
    UserService.prototype.getGoogleUser = function (idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var loginTicket, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.oAuth2Client.verifyIdToken({ idToken: idToken })];
                    case 1:
                        loginTicket = _a.sent();
                        return [2 /*return*/, loginTicket.getPayload()];
                    case 2:
                        ex_1 = _a.sent();
                        throw new common_1.UnauthorizedException(ex_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.googleSignIn = function (idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGoogleUser(idToken)];
                    case 1:
                        email = (_a.sent()).email;
                        return [4 /*yield*/, this.signIn(email)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.googleSignUp = function (idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, given_name, family_name, email;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getGoogleUser(idToken)];
                    case 1:
                        _a = _b.sent(), given_name = _a.given_name, family_name = _a.family_name, email = _a.email;
                        return [4 /*yield*/, this.signUp(given_name, family_name, email)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UserService.prototype.signIn = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userFound, ex_2, ex_3, id, firstName, lastName, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1:
                        userFound = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        throw new common_1.NotFoundException(ex_2);
                    case 3:
                        if (!password) return [3 /*break*/, 7];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, userFound.validatePassword(password)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ex_3 = _a.sent();
                        throw new common_1.BadRequestException(ex_3);
                    case 7:
                        id = userFound.id, firstName = userFound.firstName, lastName = userFound.lastName, role = userFound.role;
                        return [2 /*return*/, logged_users_1.LoggedUser.setUser({
                                id: id,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                role: role
                            })];
                }
            });
        });
    };
    UserService.prototype.signUp = function (firstName, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, ex_4, id, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = new user_entity_1.UserEntity(firstName, lastName, email, user_role_enum_1.UserRole.USER);
                        if (!password) return [3 /*break*/, 2];
                        return [4 /*yield*/, newUser.setPassword(password)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, newUser.save()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        throw new common_1.ConflictException(ex_4);
                    case 5:
                        id = newUser.id, role = newUser.role;
                        return [2 /*return*/, logged_users_1.LoggedUser.setUser({
                                id: id,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                role: role
                            })];
                }
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
