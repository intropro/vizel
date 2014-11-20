module.exports = function (grunt) {

    grunt.initConfig({
        less: {
            dist: {
                options: {
                    sourceMap: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app/less',
                        src: ['index.less'],
                        dest: 'build/dist/css',
                        ext: '.css'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/less',
                        src: ['index.less'],
                        dest: 'build/dev/css',
                        ext: '.css'
                    }
                ]
            }
        },
        watch: {
            less: {
                files: '**/*.less',
                tasks: ['build:dev'],
                options: {
                    cwd: 'app/'
                }
            },
            html: {
                files: 'index.tpl',
                tasks: ['processhtml:dev']
            },
            livereload: {
                options: {
                    livereload: true,
                    cwd: '/build/dist/css'
                },
                files: 'index.css'
            }
        },
        githooks: {
            all: {
                'post-merge': 'less:dist'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./",
                    mainConfigFile: "app/entry.js",
                    insertRequire: ['app/bootstrap'], // module to launch application from
                    name: 'app/bootstrap', // module to start parsing from
                    out: "build/dist/js/index.js",
                    optimize: 'none',
                    include: ['bower_components/requirejs/require.js', 'build/dist/js/template-cache']
                }
            }
        },
        ngtemplates: {
            compile: {
                src: 'app/**/*.html',
                dest: 'build/dist/js/template-cache.js',
                options: {
                    bootstrap: function (module, script) {
                        return "define(function (require) { require('angular').module('templateCache').run(['$templateCache', function ($templateCache) {" + script + " }]);});";
                    },
                    url: function (url) {
                        return '/' + url;
                    }
                }
            }
        },
        processhtml: {
            options: {
                data: {
                    'css_path_dev': '/build/dev/css/index.css',
                    'css_path_dist': '/css/index.css',
                    'js_path_dev': '/bower_components/requirejs/require.js',
                    'js_path_dist': '/js/index.js'
                }
            },
            dev: {
                files: {
                    'index.html': ['index.tpl']
                }
            },
            dist: {
                files: {
                    'build/dist/index.html': ['index.tpl']
                }
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                files: [
                    {
                        src: ['build/dist/css/index_app.css', 'bower_components/bootstrap/dist/css/bootstrap.min.css'],
                        dest: 'build/dist/css/index.css'
                    }
                ]
            }
        },
        copy: {
            bootstrap_dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: '**/*',
                        dest: 'build/dist/fonts'
                    }
                ]
            },
            bootstrap_dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: '**/*',
                        dest: 'build/dev/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: 'bootstrap.css.map',
                        dest: 'build/dev/css'
                    }
                ]
            },
            img_dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/img',
                        src: '**/*',
                        dest: 'build/dist/img'
                    }
                ]
            },
            img_dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/img',
                        src: '**/*',
                        dest: 'build/dev/img'
                    }
                ]
            }
        },
        process: {
            templates: {
                options: {
                    base64: false,
                    processors: [
                        {
                            pattern: '/*--process:[insert-template-cache]--*/',
                            handler: function (context, matchParams) {
                                return ", 'build/dist/js/template-cache'";
                            }
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        src: 'build/dist/js/index.js'
                    }
                ]
            }
        },
        prepend_from_file: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: ['bootstrap.min.css'],
                        dest: 'build/dist/css/index.css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/nvd3',
                        src: ['nv.d3.css'],
                        dest: 'build/dist/css/index.css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/codemirror/lib',
                        src: ['codemirror.css'],
                        dest: 'build/dist/css/index.css'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css',
                        src: ['bootstrap.css'],
                        dest: 'build/dev/css/index.css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/nvd3',
                        src: ['nv.d3.css'],
                        dest: 'build/dev/css/index.css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/codemirror/lib',
                        src: ['codemirror.css'],
                        dest: 'build/dev/css/index.css'
                    }
                ]
            }
        }
//        credentials: grunt.file.readJSON('credentials.json'),
//        environments: {
//            testing: {
//                options: {
//                    host: '<%= credentials.testing.host %>',
//                    username: '<%= credentials.testing.username %>',
//                    password: '<%= credentials.testing.password %>',
//                    port: '<%= credentials.testing.port %>',
//                    deploy_path: '/home/mkoretskyi/dap.client',
//                    local_path: 'build/dist',
//                    current_symlink: 'current',
//                    before_deploy: "rm previous && cp -P current previous",
//                    after_deploy: "",
//                    debug: true
//                }
//            }
//        }
    });

// build tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-file-process');
//    grunt.loadNpmTasks('grunt-ssh-deploy');

// development tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-githooks');


// HTMl distribution task
    grunt.registerTask('dist-html', ['ngtemplates', 'processhtml:dist']);

// JS distribution task
    grunt.registerTask('dist-js', ['requirejs:compile', 'process:templates', 'prepend_from_file:dist']);

// CSS distribution task
    grunt.registerTask('dist-css', ['less:dist', 'copy:bootstrap_dist', 'copy:img_dist']);

// build tasks
    grunt.registerTask('build:dist', ['dist-html', 'dist-css', 'dist-js']);
    grunt.registerTask('build:dev', ['processhtml:dev', 'less:dev', 'prepend_from_file:dev', 'copy:bootstrap_dev', 'copy:img_dev']);

// Default task
    grunt.registerTask('build', ['build:dist', 'build:dev']);
    grunt.registerTask('default', ['build:dist']);


// Custom tasks
    grunt.registerMultiTask('prepend_from_file', 'Prepend data from one file to another.', function () {

        var contentToAppend = '';
        this.files.forEach(function (file) {
            file.src.filter(existingFilesFilter).map(function (filepath) {
                contentToAppend += grunt.file.read(filepath);
            });

            var dstFilePath = file.orig.dest;
            if (existingFilesFilter(dstFilePath)) {
                var dstFileContent = grunt.file.read(dstFilePath);
                grunt.file.write(dstFilePath, contentToAppend + dstFileContent);
                grunt.log.ok('File "' + dstFilePath + '" appended with content from other files.');
            }
        });

        function existingFilesFilter(filepath) {
            if (!grunt.file.exists(filepath)) {
                grunt.log.warn('Source file "' + filepath + '" not found.');
                return false;
            } else {
                return true;
            }
        }

    });

};