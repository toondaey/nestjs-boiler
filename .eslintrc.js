module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/indent': ['warn', 4],
        '@typescript-eslint/explicit-member-accessibility': 'warn',
        "@typescript-eslint/semi": ["error"],
        "@typescript-eslint/camelcase": ["error", { "properties": "never" }]
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "rules": {
                "@typescript-eslint/explicit-member-accessibility": ["off"]
            }
        }
    ]
};
