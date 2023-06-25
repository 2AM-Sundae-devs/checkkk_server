"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const DetailRouter_1 = require("./routes/api/DetailRouter");
const chartRouter_1 = require("./routes/api/chartRouter");
const LoginRouter_1 = __importDefault(require("./routes/api/LoginRouter"));
const api_1 = require("./routes/api/api");
const app = (0, express_1.default)();
app.set('PORT', process.env.PORT || 8080);
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', routes_1.homeRouter);
app.use('/api', api_1.apiRouter);
app.use('/charts', chartRouter_1.chartRouter);
app.use('/details', DetailRouter_1.detailRouter);
app.use('/login', LoginRouter_1.default);
app.listen(app.get('PORT'), () => {
    console.log(`Server is running on PORT:${app.get('PORT')}`);
});
