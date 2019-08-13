import { OptionsConfig, CodeTemplateOptions } from "./interface";
import { defaultOptions as opt} from 'graphql-schema-typescript/lib/types';

export const jsDoc =
    `/**
        * This file is auto-generated
        * Please note that any changes in this file may be overwritten
    */`;

export const typeDefsDecoration = 
    `/**
        '/*******************************',
        ' *                             *',
        ' *          TYPE DEFS          *',
        ' *                             *',
        ' *******************************'
    */`;

export const typeResolversDecoration = 
    `/**
        '/*********************************',
        ' *                               *',
        ' *         TYPE RESOLVERS        *',
        ' *                               *',
        ' *********************************'
    */`;


export const defaultTemplateOptions : CodeTemplateOptions = {
    typeDefsDecoration,
    typeResolversDecoration,
    jsDoc
};


export const defaultOptions : OptionsConfig = {
    objectCode: 'all',
    typeDefsDecoration: typeDefsDecoration,
    typeResolversDecoration: typeResolversDecoration,
    jsDoc: jsDoc,
    defaultDef: `
        type Query {
            default: String
        } 
    `,
    ...opt
};