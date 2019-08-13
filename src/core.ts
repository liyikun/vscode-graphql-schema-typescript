import { buildSchema } from 'graphql';
import { TSResolverGenerator, GenerateResolversResult } from 'graphql-schema-typescript/lib/typescriptResolverGenerator';
import { TypeScriptGenerator } from 'graphql-schema-typescript/lib/typescriptGenerator';
import { formatTabSpace, introspectSchema } from 'graphql-schema-typescript/lib/utils';
import { OptionsConfig, ExtensionConfig } from './interface';
import { defaultOptions, defaultTemplateOptions } from './defaultOptions';
import * as vscode from 'vscode';
import * as fs from 'fs';



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

export async function initConfig(): Promise<OptionsConfig> {

    const codeConfiguration = vscode.workspace.getConfiguration('gstt.base') as unknown as ExtensionConfig;

    const {
        objectCode,
        defaultConfig
    } = codeConfiguration;

    let folderPath = vscode.workspace.rootPath;
    let extendJson = {

    };
    try {
        let takeConfig = await readFile(`${folderPath}/${defaultConfig}`);

        extendJson = {
            ...takeConfig
        };
    } catch (e) {
        console.log('not config');
    }

    let finalConfig: OptionsConfig = {
        ...defaultOptions,
        ...extendJson,
        objectCode
    };

    return finalConfig;
}



export function generateTeamplateAsOptions(schema: string, options: OptionsConfig): string {

    const defaultDef = options.defaultDef;

    const type = `
        "**defaultDef**"
        ${defaultDef}
        
        ${schema}
    `;

    return type;

}


export async function generateTSTypesAsString(schema: string, options: OptionsConfig) {
    let {
        objectCode,
        typeDefsDecoration,
        typeResolversDecoration,
        jsDoc,
        defaultDef,
        ...GenerateTypescriptOptions
    } = options;

    let finalschema = generateTeamplateAsOptions(schema, options);
    let schemaViaStr = buildSchema(finalschema);
    let introspectResult = await introspectSchema(schemaViaStr);

    let typeDefs: string[] = [];
    let typeResolvers: GenerateResolversResult = {
        body: [],
        importHeader: []
    };

    if (objectCode === 'all' || objectCode === 'types') {
        const tsGenerator = new TypeScriptGenerator(GenerateTypescriptOptions, introspectResult);
        typeDefs = await tsGenerator.generate();
    } else {
        typeDefsDecoration = "";
    }

    if (objectCode === 'all' || objectCode === 'reslovers') {
        const tsResolverGenerator = new TSResolverGenerator(GenerateTypescriptOptions, introspectResult);
        typeResolvers = await tsResolverGenerator.generate();
    } else {
        typeResolversDecoration = "";
    }


    let header = [...typeResolvers.importHeader, jsDoc];

    let body: string[] = [
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

    let formatted = formatTabSpace([...header, ...body], GenerateTypescriptOptions.tabSpaces);

    let result = formatted.join('\n');

    return result;
}



