import { GenerateTypescriptOptions } from "graphql-schema-typescript";


export interface CodeTemplateOptions {
    typeDefsDecoration?: string;
    typeResolversDecoration?: string;
    jsDoc?: string;   
}

export type objectCode = 'all' | 'types' | 'reslovers';

export interface OptionsConfig extends GenerateTypescriptOptions { 
    objectCode?: objectCode;
    typeDefsDecoration?: string;
    typeResolversDecoration?: string;
    jsDoc?: string;
    defaultDef?: string;
}

export interface ExtensionConfig {
    objectCode: objectCode;
    defaultConfig: string;
}