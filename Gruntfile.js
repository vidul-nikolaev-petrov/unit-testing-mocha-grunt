module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochacli: {
            all: ['tests/*/*/*.js'] // the path to the tests
        }
    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.registerTask('default', ['mochacli']);
};
