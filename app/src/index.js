"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path = __importStar(require("path"));
const bodyParser = __importStar(require("body-parser"));
const child_process_1 = require("child_process");
const app = express_1.default();
const PORT = 4242;
const PAGE_PATH = path.join(__dirname, '../../public');
app.use(morgan_1.default('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.static(PAGE_PATH));
// protect the API:
app.disable('x-powered-by');
function inlineExec(cmd, res, mapData) {
    child_process_1.exec(cmd, (error, stdout, stderr) => {
        if (!error) {
            res.send(JSON.stringify({
                data: JSON.parse(!!mapData ? mapData(stdout) : stdout)
            }));
        }
        else {
            res.send(JSON.stringify({
                error: stderr
            }));
        }
    });
}
function error(msg, res) {
    res.send(JSON.stringify({
        error: msg
    }));
}
app.post('/api', (req, res) => {
    var _a, _b;
    const args = (_a = req.body) === null || _a === void 0 ? void 0 : _a.args;
    const ns = (_b = req.body) === null || _b === void 0 ? void 0 : _b.namespace;
    if (!ns) {
        error('No namespace specified', res);
        return;
    }
    switch (req.body.cmd) {
        case 'repositories': {
            inlineExec(`az acr repository list -n ${ns}`, res);
            break;
        }
        case 'show-manifests': {
            if (!(args === null || args === void 0 ? void 0 : args.repo)) {
                error('Missing argument repo in args', res);
                break;
            }
            inlineExec(`az acr repository show-manifests --name ${ns} --repository ${args.repo}`, res);
            break;
        }
    }
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map