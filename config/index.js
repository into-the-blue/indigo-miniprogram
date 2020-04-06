const path = require('path');
const fs = require('fs');
const SRC_DIR = path.join(__dirname, '..', 'src');
// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = function (url) {
  if (url[0] === '~' && url[1] !== '/') {
    return {
      file: path.resolve(__dirname, '..', 'node_modules', url.substr(1)),
    };
  }

  const reg = /^@styles\/(.*)/;
  return {
    file: reg.test(url) ? path.resolve(__dirname, '..', 'src/styles', url.match(reg)[1]) : url,
  };
};
const dirs = fs.readdirSync(SRC_DIR);
const _alias = {};

dirs.forEach((dirname) => {
  _alias['@/' + dirname] = path.resolve(__dirname, '..', 'src', dirname);
});

// const TEMP_FIX_TARO_UI = {
//   'taro-ui': path.resolve(__dirname, '../src/taro-ui'),
//   nervjs: path.resolve(__dirname, '../node_modules/react'),
// };

const config = {
  projectName: 'indigo-mp',
  date: '2020-2-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    sass: {
      importer: sassImporter,
    },
  },

  defineConstants: {},
  alias: {
    '@/': path.resolve(__dirname, '..', 'src'),
    ..._alias,
    '@styles': path.resolve(__dirname, '..', 'src', 'styles'),
    // ...TEMP_FIX_TARO_UI,
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
