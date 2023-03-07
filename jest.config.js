/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}

module.exports = config
