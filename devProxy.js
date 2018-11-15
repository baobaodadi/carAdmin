module.exports = {
    test: {
      '^/taxi/**': {
        target: 'http://10.129.205.109:8080/',
        hostRewrite: 'http://10.129.205.109:8080/',
        changeOrigin: true,
        secure: false,
      }
    },
//   // prod: {
//   //   '/api/v1/exceptionData/**': {
//   //     target: 'http://10.129.204.157',
//   //     secure: false,
//   //   },
//   // }
};
