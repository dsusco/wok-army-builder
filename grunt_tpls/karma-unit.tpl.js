module.exports = function (karma) {
  karma.set({
    autoWatch: false,
    basePath: '../',
    browsers: [
      'PhantomJS'
    ],
    files: [
      <% scripts.forEach(function (file) { %>'<%= file %>',
      <% }); %>
      'src/**/*.js'
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [
      'jasmine'
    ],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ],
    port: 9018,
    reporters: 'dots',
    runnerPort: 9100,
    urlRoot: '/'
  });
};

