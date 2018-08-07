module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
            dist: {
                files: {
                    'templates/DailyEditionStyle.css' : 'scss/style.scss'
                }
            }
        },
        connect: {
          server: {
            options: {
              // uncomment below to use https server
              // protocol: 'https',
              port: 8000,
              useAvailablePort: true,
              base: 'templates',
              livereload: true
            }
          }
        },
    watch: {
          options: {
            livereload: true,
          },
          css: {
              files: '**/*.scss',
              tasks: ['sass']
          },
          configFiles: {
            files: [ 'Gruntfile.js', 'config/*.js' ],
            options: {
              reload: true
            }
          }
        }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['sass', 'connect', 'watch']);

};
