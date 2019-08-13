"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const typescriptResolverGenerator_1 = require("graphql-schema-typescript/lib/typescriptResolverGenerator");
const typescriptGenerator_1 = require("graphql-schema-typescript/lib/typescriptGenerator");
const utils_1 = require("graphql-schema-typescript/lib/utils");
const defaultOptions_1 = require("./defaultOptions");
const vscode = require("vscode");
const fs = require("fs");
let readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
};
function initConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        const codeConfiguration = vscode.workspace.getConfiguration('gstt.base');
        const { objectCode, defaultConfig } = codeConfiguration;
        let folderPath = vscode.workspace.rootPath;
        let extendJson = {};
        try {
            let takeConfig = yield readFile(`${folderPath}/${defaultConfig}`);
            extendJson = Object.assign({}, takeConfig);
        }
        catch (e) {
            console.log('not config');
        }
        let finalConfig = Object.assign({}, defaultOptions_1.defaultOptions, extendJson, { objectCode });
        return finalConfig;
    });
}
exports.initConfig = initConfig;
function generateTeamplateAsOptions(schema, options) {
    const defaultDef = options.defaultDef;
    const type = `
        "**defaultDef**"
        ${defaultDef}
        
        ${schema}
    `;
    return type;
}
exports.generateTeamplateAsOptions = generateTeamplateAsOptions;
function generateTSTypesAsString(schema, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let { objectCode, typeDefsDecoration, typeResolversDecoration, jsDoc, defaultDef } = options, GenerateTypescriptOptions = __rest(options, ["objectCode", "typeDefsDecoration", "typeResolversDecoration", "jsDoc", "defaultDef"]);
        let finalschema = generateTeamplateAsOptions(schema, options);
        let schemaViaStr = graphql_1.buildSchema(finalschema);
        let introspectResult = yield utils_1.introspectSchema(schemaViaStr);
        let typeDefs = [];
        let typeResolvers = {
            body: [],
            importHeader: []
        };
        if (objectCode === 'all' || objectCode === 'types') {
            const tsGenerator = new typescriptGenerator_1.TypeScriptGenerator(GenerateTypescriptOptions, introspectResult);
            typeDefs = yield tsGenerator.generate();
        }
        else {
            typeDefsDecoration = "";
        }
        if (objectCode === 'all' || objectCode === 'reslovers') {
            const tsResolverGenerator = new typescriptResolverGenerator_1.TSResolverGenerator(GenerateTypescriptOptions, introspectResult);
            typeResolvers = yield tsResolverGenerator.generate();
        }
        else {
            typeResolversDecoration = "";
        }
        let header = [...typeResolvers.importHeader, jsDoc];
        let body = [
            typeDefsDecoration,
            ...typeDefs,
            typeResolversDecoration,
            ...typeResolvers.body
        ];
        if (GenerateTypescriptOptions.namespace) {
            body = [
                `namespace ${options.namespace} {`,
                ...body,
                '}'
            ];
        }
        if (GenerateTypescriptOptions.global) {
            body = [
                'export { };',
                '',
                'declare global {',
                ...body,
                '}'
            ];
        }
        let formatted = utils_1.formatTabSpace([...header, ...body], GenerateTypescriptOptions.tabSpaces);
        let result = formatted.join('\n');
        return result;
    });
}
exports.generateTSTypesAsString = generateTSTypesAsString;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function TestEditor() {
    return __awaiter(this, void 0, void 0, function* () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return "";
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        const options = yield initConfig();
        try {
            const content = yield generateTSTypesAsString(text, options);
            return content;
        }
        catch (e) {
            return e.message;
        }
    });
}
exports.TestEditor = TestEditor;
//# sourceMappingURL=core.js.map