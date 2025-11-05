"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.permit)('admin'), users_controller_1.listUsers);
exports.default = router;
