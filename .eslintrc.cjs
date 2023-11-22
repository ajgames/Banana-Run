module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@typescript-eslint/ban-ts-comment': [
            'warn',
            {
                'ts-ignore': 'allow-with-description',
                'ts-expect-error': 'allow-with-description',
                'ts-nocheck': 'allow-with-description',
                'ts-check': false,
                minimumDescriptionLength: 3,
            },
        ],
    },
}
