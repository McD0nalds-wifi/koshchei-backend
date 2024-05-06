module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint',
        'sort-keys-fix',
        'typescript-sort-keys',
        '@typescript-eslint',
        'import',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:typescript-sort-keys/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        quotes: ['warn', 'single'],
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'import/no-unresolved': 'error',
        'import/default': 'error',
        'import/no-self-import': 'error',
        'max-len': [
            'warn',
            {
                code: 120,
            },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                'newlines-between': 'always',
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
            },
        ],
        'sort-imports': ['error', { allowSeparatedGroups: true, ignoreDeclarationSort: true }],
        'sort-keys-fix/sort-keys-fix': 'warn',
    },
    settings: {
        'import/ignore': ['node_modules/react-native/index\\.js$'],
        'import/resolver': {
            typescript: {},
            node: {
                paths: ['./'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
}
