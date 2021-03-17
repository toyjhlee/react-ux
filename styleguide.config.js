const {version} = require('./package')

const ignore = [
  '**/__tests__/**',
  '**/mock/**',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/*.spec.{js,jsx,ts,tsx}',
  '**/*.d.ts',
]

module.exports = {
  title: 'toyjhlee react ui',
  components: ['src/components/**/*.tsx', 'src/components/*.tsx'],
  version,
  ignore,
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css',
        },
        {
          rel: 'stylesheet',
          href: 'src/assets/styles/reset.css',
        },
        {
          rel: 'stylesheet',
          href: 'src/assets/styles/base.css',
        },
      ],
    },
  },
  theme: {
    fontFamily: {
      base: '"Spoqa Han Sans", sans-serif',
    },
  },
  styleguideDir: 'docs',
  //   sections: [
  //     {
  //       name: 'test',
  //       components: () => ['src/components/example/ExampleComponent.tsx'],
  //       sections: [
  //         {
  //           name: 'Font',
  //           content: 'src/components/example/ExampleComponent.md',
  //         },
  //       ],
  //     },
  //   ],
  webpackConfig: {
    devServer: {
      // Docs: https://codesandbox.io/docs/environment#how-can-i-tell-if-i-am-in-a-container-sandbox
      //   disableHostCheck: !!process.env.CODESANDBOX_SSE,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
          ],
        },
      ],
    },
  },
}
