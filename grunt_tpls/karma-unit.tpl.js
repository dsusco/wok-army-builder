module.exports = function (karma) {
  karma.set({
    autoWatch: false,
    basePath: '../',
    browsers: [
      'Chrome'
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
      'karma-chrome-launcher'
    ],
    port: 9018,
    reporters: 'dots',
    runnerPort: 9100,
    urlRoot: '/'
  });
};

