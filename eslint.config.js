import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/src-tauri/**',
    ],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
          internalPattern: ['^#.+', '^~/.+'],
          newlinesBetween: 'never',
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
];
