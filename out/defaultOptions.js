"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("graphql-schema-typescript/lib/types");
exports.jsDoc = `/**
        * This file is auto-generated
        * Please note that any changes in this file may be overwritten
    */`;
exports.typeDefsDecoration = `/**
        '/*******************************',
        ' *                             *',
        ' *          TYPE DEFS          *',
        ' *                             *',
        ' *******************************'
    */`;
exports.typeResolversDecoration = `/**
        '/*********************************',
        ' *                               *',
        ' *         TYPE RESOLVERS        *',
        ' *                               *',
        ' *********************************'
    */`;
exports.defaultTemplateOptions = {
    typeDefsDecoration: exports.typeDefsDecoration,
    typeResolversDecoration: exports.typeResolversDecoration,
    jsDoc: exports.jsDoc
};
exports.defaultOptions = Object.assign({ objectCode: 'all', typeDefsDecoration: exports.typeDefsDecoration, typeResolversDecoration: exports.typeResolversDecoration, jsDoc: exports.jsDoc, defaultDef: `
        type Query {
            default: String
        } 
    ` }, types_1.defaultOptions);
//# sourceMappingURL=defaultOptions.js.map