define(function (require) { require('angular').module('templateCache').run(['$templateCache', function ($templateCache) {  'use strict';

  $templateCache.put('/app/controls/notebookBlock/notebookBlock.html',
    "<div class=\"notebook-block-content\">\n" +
    "    <i ng-show=\"isExecuting\" class=\"notebook-block-executing-spinner\"></i>\n" +
    "\n" +
    "    <h3 class=\"text-center notebook-block__title\">{{block.title}}</h3>\n" +
    "    <input type=\"text\" class=\"form-control notebook-block__title-editable\" ng-model=\"block.title\" placeholder=\"Type title here\"/>\n" +
    "\n" +
    "    <div ng-include=\"block.plugin.snippetUrl\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"notebook-buttons-block\">\n" +
    "        <i class=\"glyphicon glyphicon-cog notebook-block-settings\" ng-click=\"showBlockOptions()\"></i>\n" +
    "        <i class=\"glyphicon glyphicon-remove notebook-block-remove\" ng-click=\"removeBlock()\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"notebook-block-resize clearfix\">\n" +
    "        <div class=\"notebook-block-resize-btn\" ng-click=\"decreaseSize()\"\n" +
    "             ng-hide=\"block.availableSizes.indexOf(block.size) === 0\">\n" +
    "            <i class=\"glyphicon glyphicon-chevron-left\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"notebook-block-resize-btn\" ng-click=\"increaseSize()\"\n" +
    "             ng-hide=\"block.availableSizes.indexOf(block.size) === block.availableSizes.length - 1\">\n" +
    "            <i class=\"glyphicon glyphicon-chevron-right\"></i>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/controls/plots/barChart/barChart.html',
    "<div class=\"plot-bar-chart\"></div>"
  );


  $templateCache.put('/app/controls/plots/bigNumberChart/bigNumberChart.html',
    "<div class=\"big-number-chart\">\n" +
    "</div>"
  );


  $templateCache.put('/app/controls/plots/grid/grid.html',
    "<div class=\"plot-grid\">\n" +
    "    <table class=\"table\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th ng-repeat=\"col in columns\">{{col.title}}</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"row in model.data\">\n" +
    "            <td ng-repeat=\"col in columns\">{{row[col.key]}}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/controls/plots/lineChart/lineChart.html',
    "<div nvd3 class=\"plot-line-chart\" data=\"data\" options='options' ></div>"
  );


  $templateCache.put('/app/controls/plots/mapChart/mapChart.html',
    "<div class=\"plot-map-chart\" datamap\n" +
    "        options=\"map.options\"\n" +
    "        data=\"map.data\"\n" +
    "        colors=\"map.colors\"\n" +
    "        type=\"{{map.type}}\"\n" +
    "        >\n" +
    "</div>"
  );


  $templateCache.put('/app/controls/plots/multiBarChart/multiBarChart.html',
    "<div class=\"plot-multi-bar-chart\" nvd3 options='options' data=\"data\"></div>"
  );


  $templateCache.put('/app/controls/plots/percentsChart/percentsChart.html',
    "<div class=\"percents-chart\"></div>"
  );


  $templateCache.put('/app/controls/plots/pieChart/pieChart.html',
    "<div nvd3 class=\"plot-pie-chart\" data=\"data\" options='options'></div>"
  );


  $templateCache.put('/app/controls/presentationBlock/presentationBlock.html',
    "<div ng-if=\"block.error\" class=\"\">\n" +
    "    {{block.error}}\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"block.type === types.grid\" class=\" presentation-control-container-table\" plot-grid plot-data=\"block\">\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"block.type === types.multiBarChart\" class=\" presentation-control-container-chart\" plot-bar-chart\n" +
    "     plot-data=\"block\">\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"block.type === types.lineChart\" class=\" presentation-control-container-chart\" plot-line-chart\n" +
    "     plot-data=\"block\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.pieChart\">\n" +
    "    <div class=\" presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.mapChart\">\n" +
    "    <div class=\"presentation-control-container-chart\" plot-map-chart plot-data=\"block\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.percentsChart\">\n" +
    "    <div class=\"presentation-control-container-chart\" plot-percents-chart plot-data=\"block\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.bigNumberChart\">\n" +
    "    <div class=\"presentation-control-container-chart\" plot-big-number-chart plot-data=\"block\">\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"presentation-block-buttons\">\n" +
    "    <div style=\"padding-bottom: 15px;\">\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.grid}\"\n" +
    "                ng-click=\"selectType(types.grid)\">\n" +
    "            <i class=\"glyphicon glyphicon-barcode\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.multiBarChart}\"\n" +
    "                ng-click=\"selectType(types.multiBarChart)\">\n" +
    "            <i class=\"glyphicon glyphicon-stats\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.lineChart}\"\n" +
    "                ng-click=\"selectType(types.lineChart)\">\n" +
    "            <i class=\"glyphicon glyphicon-picture\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.pieChart}\"\n" +
    "                ng-click=\"selectType(types.pieChart)\">\n" +
    "            <i class=\"glyphicon glyphicon-adjust\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.mapChart}\"\n" +
    "                ng-click=\"selectType(types.mapChart)\">\n" +
    "            <i class=\"icon__usa-map_14\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.percentsChart}\"\n" +
    "                ng-click=\"selectType(types.percentsChart)\">\n" +
    "            <i class=\"glyphicon glyphicon-dashboard\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.bigNumberChart}\"\n" +
    "                ng-click=\"selectType(types.bigNumberChart)\">\n" +
    "            <i class=\"glyphicon glyphicon-sound-5-1\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <button class=\"btn btn-primary\" ng-hide=\"block.type == types.grid\" style=\"margin-left: 20px;\"\n" +
    "                ng-click=\"showPlotOptions(block, plotOptions)\">\n" +
    "            <i class=\"glyphicon glyphicon-cog\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <span ng-show=\"block.updatePeriod\" style=\"padding-left: 20px; color: gray;\">Update interval: <b>{{block.updatePeriod}}</b> sec.</span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/app/modules/queryPlugins/markdown/markdownQueryPlugin_control/markdownQueryPlugin.html',
    "<div class=\"query-plugin-markdown\">\n" +
    "    <!--query-->\n" +
    "    <div class=\"\">\n" +
    "        <div class=\"\">\n" +
    "            <div class=\"query-plugin-markdown_query-container\">\n" +
    "                <span class=\"query-plugin-markdown_query-prefix\">&gt;</span>\n" +
    "                <div class=\"query-plugin-markdown_query-input\"\n" +
    "                     ui-codemirror ui-codemirror-opts=\"codeMirrorOpts\"\n" +
    "                     ng-model=\"block.in\">\n" +
    "                </div>\n" +
    "                <p class=\"query-plugin-markdown_query-legend\">\n" +
    "                    Press Shift+Enter to convert markdown to HTML. Press Enter to start a new line\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--result-->\n" +
    "    <div class=\"\">\n" +
    "        <div class=\"\">\n" +
    "            <div class=\"query-plugin-markdown_result\" ng-bind-html=\"resultHtml\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/app/modules/queryPlugins/markdown/snippet.html',
    "<div markdown-query-plugin=\"block\"></div>"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/blockOptions.html',
    "<div class=\"form-group\">\n" +
    "    <label class=\"block-options-label\">Backend:</label>\n" +
    "    <div class=\"btn-group\" dropdown>\n" +
    "        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>{{block.backend.name || '- choose backend -'}}<span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" ng-controller=\"controller_sql_QueryPlugin\">\n" +
    "            <li ng-repeat=\"cl in allBackends | filter:{language: block.plugin.queryLanguage}:true\">\n" +
    "                <a ng-click=\"block.backend = cl\">{{cl.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"block-options-label\">Update interval (sec):</label>\n" +
    "    <input type=\"number\" class=\"form-control\" ng-model=\"block.updatePeriod\" style=\"display: inline-block; width: auto;\" />\n" +
    "</div>\n"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/snippet.html',
    "<div sql-query-plugin=\"block\"></div>"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/sqlQueryPlugin_control/sqlQueryPlugin.html',
    "<div class=\"query-plugin-sql\">\n" +
    "    <i ng-show=\"isExecuting\" class=\"query-plugin-sql_executing-spinner\"></i>\n" +
    "\n" +
    "    <!--query-->\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div class=\"query-plugin-sql_query-container\">\n" +
    "                <span class=\"query-plugin-sql_query-prefix\">&gt;</span>\n" +
    "                <div class=\"query-plugin-sql_query-input\"\n" +
    "                     ui-codemirror autofocus ui-codemirror-opts=\"codeMirrorOpts\"\n" +
    "                     ng-model=\"block.in\">\n" +
    "                </div>\n" +
    "                <p class=\"query-plugin-sql_query-legend\">Press Shift+Enter to execute query. Press Enter to start a new\n" +
    "                    line\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--variables-->\n" +
    "    <div class=\"row query-plugin-sql_variables\" ng-if=\"block.variables.length > 0\">\n" +
    "        <div class=\"form-group col-lg-4 col-md-6 col-sm-12\" ng-repeat=\"v in block.variables\">\n" +
    "            <label class=\"control-label query-plugin-sql_variables__label\">{{v.label || v.name}}:\n" +
    "                <input type=\"text\" class=\"form-control query-plugin-sql_variables__input\" ng-model=\"v.value\"/>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!--result-->\n" +
    "    <div class=\"row\" ng-if=\"errorMessage\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div class=\"alert alert-danger\" role=\"alert\">\n" +
    "                {{errorMessage}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <div presentation-block class=\"presentation-block\" presentation-data=\"block\" ng-if=\"block.isExecuted\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/app/views/backendList.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <h3>\n" +
    "                Saved backends\n" +
    "                <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"createNew()\">\n" +
    "                    Create new <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "                </button>\n" +
    "            </h3>\n" +
    "\n" +
    "            <table class=\"table\" style=\"border:1px solid #ddd;\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Name</th>\n" +
    "                    <th>End point</th>\n" +
    "                    <th>Path to data</th>\n" +
    "                    <th>Path to error</th>\n" +
    "                    <th>Language</th>\n" +
    "                    <th></th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"b in list\">\n" +
    "                    <td><a ng-click=\"editInDialog(b)\">{{b.name}}</a></td>\n" +
    "                    <td>{{b.endPoint}}</td>\n" +
    "                    <td>{{b.pathToData}}</td>\n" +
    "                    <td>{{b.pathToError}}</td>\n" +
    "                    <td>{{b.language}}</td>\n" +
    "                    <td>\n" +
    "                        <button class=\"btn btn-default\" ng-click=\"editInDialog(b)\"><i\n" +
    "                                class=\"glyphicon glyphicon-pencil\"></i></button>\n" +
    "                        <button class=\"btn btn-danger\" ng-click=\"remove(b)\"><i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/views/blockOptions.html',
    "<h2 class=\"text-center\">Block options</h2>\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-12-10 col-md-12\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"block-options-label\">Title:</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"block.title\" style=\"display: inline-block; width: auto;\" placeholder=\"Type title here\" />\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"block-options-label\">Language:</label>\n" +
    "                <div class=\"btn-group\" dropdown>\n" +
    "                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>{{block.plugin.queryLanguage || '[select language]'}}<span class=\"caret\"></span>\n" +
    "                    </button>\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                        <li ng-repeat=\"pl in plugins\">\n" +
    "                            <a ng-click=\"selectPlugin(pl)\">{{pl.queryLanguage}}</a>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-include=\"block.plugin.blockOptionsSnippetUrl\"></div>\n" +
    "    <div>\n" +
    "        <p class=\"clearfix\">\n" +
    "            <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/app/views/editBackend.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "\n" +
    "            <div class=\"edit-backend_title\">\n" +
    "                <h2>Edit backend</h2>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"edit-backend_content\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">Name:</label>\n" +
    "                    <input type=\"text\" ng-model=\"backend.name\" class=\"form-control\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">End point:</label>\n" +
    "                    <input type=\"text\" ng-model=\"backend.endPoint\" class=\"form-control\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">Path to data:</label>\n" +
    "                    <input type=\"text\" ng-model=\"backend.pathToData\" class=\"form-control\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">Path to error:</label>\n" +
    "                    <input type=\"text\" ng-model=\"backend.pathToError\" class=\"form-control\"/>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">Language:</label>\n" +
    "\n" +
    "                    <div class=\"btn-group\" dropdown>\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>\n" +
    "                            {{backend.language || '- choose language -'}}<span class=\"caret\"></span>\n" +
    "                        </button>\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                            <li ng-repeat=\"p in plugins\">\n" +
    "                                <a ng-click=\"backend.language = p.queryLanguage\">{{p.queryLanguage}}</a>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"edit-luster_buttons\">\n" +
    "                <p class=\"clearfix\">\n" +
    "                    <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\n" +
    "                    <button class=\"btn btn-primary pull-right\" ng-click=\"save()\">Save</button>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/views/editNotebook.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "\n" +
    "            <div class=\"edit-notebook_title\">\n" +
    "                <h2>Edit notebook</h2>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"edit-notebook_content\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"\">Name:</label>\n" +
    "                    <input type=\"text\" ng-model=\"notebook.name\" class=\"form-control\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"edit-luster_buttons\">\n" +
    "                <p class=\"clearfix\">\n" +
    "                    <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\n" +
    "                    <button class=\"btn btn-primary pull-right\" ng-click=\"save()\">Save</button>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/views/index.html',
    "<div class=\"notebook-error-message\" ng-if=\"errorMessage\">{{errorMessage}}</div>\n" +
    "<div class=\"content\" ng-if=\"notebook\"  ng-class=\"{\n" +
    "    'edit-mode': !isViewMode,\n" +
    "    'view-mode': isViewMode\n" +
    "    }\">\n" +
    "    <div class=\"block-list\">\n" +
    "        <div notebook-block class=\"notebook-block\"\n" +
    "             ng-class=\"{\n" +
    "            'col-lg-12': block.size === 12,\n" +
    "            'col-lg-8 col-md-12 col-sm-12': block.size === 8,\n" +
    "            'col-lg-6 col-md-8 col-sm-12': block.size === 6,\n" +
    "            'col-lg-4 col-md-6 col-sm-12': block.size === 4,\n" +
    "            'col-lg-3 col-md-4 col-sm-6': block.size === 3,\n" +
    "            'col-lg-2 col-md-3 col-sm-4': block.size === 2\n" +
    "        }\"\n" +
    "             ng-repeat=\"block in blocks\" notebook-block-model=\"block\" remove-callback=\"removeNotebookBlock\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"text-center notebook-block_buttons\">\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"addBlock()\">Create new block</button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/app/views/notebooks.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "\n" +
    "            <h3>\n" +
    "                Saved notebooks\n" +
    "                <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"createNew()\">\n" +
    "                    Create new <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "                </button>\n" +
    "            </h3>\n" +
    "\n" +
    "            <table class=\"table\" style=\"border:1px solid #ddd;\">\n" +
    "                <colgroup>\n" +
    "                    <col>\n" +
    "                    <col width=\"110\">\n" +
    "                </colgroup>\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Name</th>\n" +
    "                    <th></th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr ng-repeat=\"n in notebooks\">\n" +
    "                    <td><a ng-href=\"#/notebook/{{n.id}}\">{{n.name || \"notebook № \" + n.id}} ({{n.id}})</a></td>\n" +
    "                    <td>\n" +
    "                        <button class=\"btn btn-default\" ng-click=\"editInDialog(n)\"><i\n" +
    "                                class=\"glyphicon glyphicon-pencil\"></i></button>\n" +
    "                        <button class=\"btn btn-danger\" ng-click=\"remove(n)\"><i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "                        </button>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/app/views/plotOptions.html',
    "<h2 class=\"text-center\">Plot options</h2>\n" +
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-3 col-md-12\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-lg-12 col-md-4 col-sm-4\" style=\"margin-bottom:10px;\">\n" +
    "                    <div>Key:</div>\n" +
    "                    <select ng-model=\"block.options.key\" ng-options=\"value for value in block.options.availableKeys\">\n" +
    "                    </select>\n" +
    "                    <div>Key type:</div>\n" +
    "                    <select ng-model=\"block.options.keyType\" ng-options=\"t for t in block.options.types\"></select>\n" +
    "                </div>\n" +
    "                <div class=\"col-lg-12 col-md-4 col-sm-4\" style=\"margin-bottom:10px;\">\n" +
    "                    <div>Value:</div>\n" +
    "                    <select ng-model=\"block.options.value\"\n" +
    "                            ng-options=\"value for value in block.options.availableValues\">\n" +
    "                    </select>\n" +
    "                    <div>Value type:</div>\n" +
    "                    <select ng-model=\"block.options.valueType\" ng-options=\"t for t in block.options.types\"></select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-lg-9 col-md-12\">\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.multiBarChart\">\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-bar-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.lineChart\">\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-line-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.pieChart\">\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.mapChart\">\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-map-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"\" ng-if=\"block.type === types.percentsChart\">\n" +
    "                <div class=\"presentation-control-container-chart\" plot-percents-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"\" ng-if=\"block.type === types.bigNumberChart\">\n" +
    "                <div class=\"presentation-control-container-chart\" plot-big-number-chart plot-data=\"block\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-lg-12\">\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.multiBarChart}\"\n" +
    "                    ng-click=\"selectType(types.multiBarChart)\">\n" +
    "                <i class=\"glyphicon glyphicon-stats\"></i>\n" +
    "            </button>\n" +
    "\n" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.lineChart}\"\n" +
    "                    ng-click=\"selectType(types.lineChart)\">\n" +
    "                <i class=\"glyphicon glyphicon-picture\"></i>\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.pieChart}\"\n" +
    "                    ng-click=\"selectType(types.pieChart)\">\n" +
    "                <i class=\"glyphicon glyphicon-adjust\"></i>\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.mapChart}\"\n" +
    "                    ng-click=\"selectType(types.mapChart)\">\n" +
    "                <i class=\"icon__usa-map_14\"></i>\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.percentsChart}\"\n" +
    "                    ng-click=\"selectType(types.percentsChart)\">\n" +
    "                <i class=\"glyphicon glyphicon-dashboard\"></i>\n" +
    "            </button>\n" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.bigNumberChart}\"\n" +
    "                    ng-click=\"selectType(types.bigNumberChart)\">\n" +
    "                <i class=\"glyphicon glyphicon-sound-5-1\"></i>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <p class=\"clearfix\">\n" +
    "            <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"
  );
 }]);});