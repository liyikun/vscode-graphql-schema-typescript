# vscode-graphql-schema-to-typescript

> extends by https://github.com/dangcuuson/graphql-schema-typescript


![test](https://raw.githubusercontent.com/liyikun/vscode-graphql-schema-typescript/master/image/test.gif)


## Future

 Simple Generate a typescript interface based on your graphql type

## Configuration

![config](https://raw.githubusercontent.com/liyikun/vscode-graphql-schema-typescript/master/image/config.png)


### config file example

```json
    {
        "defaultDef": "scalar JSON type Query { json: JSON }",
        "typeDefsDecoration": "/** ==== defs types ==== */",
        "typeResolversDecoration": "/** ==== resolvers types ==== *",
        "jsDoc": "/** This file is auto-generated */"
    }
```

### object code
> support output defs types or resolvers types and all

## Other Config

* `options`: see [GenerateTypescriptOptions](https://github.com/dangcuuson/graphql-schema-typescript/blob/master/src/types.ts)


