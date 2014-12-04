define(function (require) { require('angular').module('templateCache').run(['$templateCache', function ($templateCache) {  'use strict';

  $templateCache.put('/app/controls/notebookBlock/notebookBlock.html',
    "<div class=\"notebook-block-content\">\r" +
    "\n" +
    "    <i ng-show=\"isExecuting\" class=\"notebook-block-executing-spinner\"></i>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-include=\"block.plugin.snippetUrl\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"notebook-buttons-block\">\r" +
    "\n" +
    "        <i class=\"glyphicon glyphicon-cog notebook-block-settings\" ng-click=\"showBlockOptions()\"></i>\r" +
    "\n" +
    "        <i class=\"glyphicon glyphicon-remove notebook-block-remove\" ng-click=\"removeBlock()\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"notebook-block-resize clearfix\">\r" +
    "\n" +
    "        <div class=\"notebook-block-resize-btn\" ng-click=\"decreaseSize()\"\r" +
    "\n" +
    "             ng-hide=\"block.availableSizes.indexOf(block.size) === 0\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-chevron-left\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"notebook-block-resize-btn\" ng-click=\"increaseSize()\"\r" +
    "\n" +
    "             ng-hide=\"block.availableSizes.indexOf(block.size) === block.availableSizes.length - 1\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-chevron-right\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/controls/plots/bigNumberChart/bigNumberChart.html',
    "<div class=\"big-number-chart\">\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/controls/plots/grid/grid.html',
    "<div class=\"plot-grid\">\r" +
    "\n" +
    "    <table class=\"table\">\r" +
    "\n" +
    "        <thead>\r" +
    "\n" +
    "        <tr>\r" +
    "\n" +
    "            <th ng-repeat=\"col in columns\">{{col.title}}</th>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </thead>\r" +
    "\n" +
    "        <tbody>\r" +
    "\n" +
    "        <tr ng-repeat=\"row in model.data\">\r" +
    "\n" +
    "            <td ng-repeat=\"col in columns\">{{row[col.key]}}</td>\r" +
    "\n" +
    "        </tr>\r" +
    "\n" +
    "        </tbody>\r" +
    "\n" +
    "    </table>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/controls/plots/lineChart/lineChart.html',
    "<div nvd3 class=\"plot-line-chart\" data=\"data\" options='options' ></div>"
  );


  $templateCache.put('/app/controls/plots/mapChart/mapChart.html',
    "<div class=\"plot-map-chart\" datamap\r" +
    "\n" +
    "        options=\"map.options\"\r" +
    "\n" +
    "        data=\"map.data\"\r" +
    "\n" +
    "        colors=\"map.colors\"\r" +
    "\n" +
    "        type=\"{{map.type}}\"\r" +
    "\n" +
    "        >\r" +
    "\n" +
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
    "<div ng-if=\"block.error\" class=\"\">\r" +
    "\n" +
    "    {{block.error}}\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-if=\"block.type === types.grid\" class=\" presentation-control-container-table\" plot-grid plot-data=\"block\">\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-if=\"block.type === types.multiBarChart\" class=\" presentation-control-container-chart\" plot-multi-bar-chart\r" +
    "\n" +
    "     plot-data=\"block\">\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div ng-if=\"block.type === types.lineChart\" class=\" presentation-control-container-chart\" plot-line-chart\r" +
    "\n" +
    "     plot-data=\"block\">\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.pieChart\">\r" +
    "\n" +
    "    <div class=\" presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.mapChart\">\r" +
    "\n" +
    "    <div class=\"presentation-control-container-chart\" plot-map-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.percentsChart\">\r" +
    "\n" +
    "    <div class=\"presentation-control-container-chart\" plot-percents-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"\" ng-if=\"block.type === types.bigNumberChart\">\r" +
    "\n" +
    "    <div class=\"presentation-control-container-chart\" plot-big-number-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"presentation-block-buttons\">\r" +
    "\n" +
    "    <div style=\"padding-bottom: 15px;\">\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.grid}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.grid)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-barcode\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.multiBarChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.multiBarChart)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-stats\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.lineChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.lineChart)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-picture\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.pieChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.pieChart)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-adjust\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.mapChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.mapChart)\">\r" +
    "\n" +
    "            <i class=\"icon__usa-map_14\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.percentsChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.percentsChart)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-dashboard\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.bigNumberChart}\"\r" +
    "\n" +
    "                ng-click=\"selectType(types.bigNumberChart)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-sound-5-1\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-hide=\"block.type == types.grid\"\r" +
    "\n" +
    "                ng-click=\"showPlotOptions(block, plotOptions)\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-cog\"></i>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <span ng-show=\"block.updatePeriod\" style=\"padding-left: 20px; color: gray;\">Update interval: <b>{{block.updatePeriod}}</b> sec.</span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/modules/queryPlugins/markdown/markdownQueryPlugin_control/markdownQueryPlugin.html',
    "<div class=\"query-plugin-markdown\">\r" +
    "\n" +
    "    <!--query-->\r" +
    "\n" +
    "    <div class=\"\">\r" +
    "\n" +
    "        <div class=\"\">\r" +
    "\n" +
    "            <div class=\"query-plugin-markdown_query-container\">\r" +
    "\n" +
    "                <span class=\"query-plugin-markdown_query-prefix\">&gt;</span>\r" +
    "\n" +
    "                <div class=\"query-plugin-markdown_query-input\"\r" +
    "\n" +
    "                     ui-codemirror ui-codemirror-opts=\"codeMirrorOpts\"\r" +
    "\n" +
    "                     ng-model=\"block.in\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"query-plugin-markdown_query-legend\" ng-show=\"isEditorFocused\">\r" +
    "\n" +
    "                    Press Shift+Enter to convert markdown to HTML. Press Enter to start a new line\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!--result-->\r" +
    "\n" +
    "    <div class=\"\">\r" +
    "\n" +
    "        <div class=\"\">\r" +
    "\n" +
    "            <div class=\"query-plugin-markdown_result\" ng-bind-html=\"resultHtml\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/modules/queryPlugins/markdown/snippet.html',
    "<div markdown-query-plugin=\"block\"></div>"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/blockOptions.html',
    "<div class=\"form-group\">\r" +
    "\n" +
    "    <label class=\"block-options-label\">Cluster:</label>\r" +
    "\n" +
    "    <div class=\"btn-group\" dropdown>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>{{block.cluster.name || '- choose cluster -'}}<span class=\"caret\"></span>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" ng-controller=\"controller_sql_QueryPlugin\">\r" +
    "\n" +
    "            <li ng-repeat=\"cl in allClusters | filter:{language: block.plugin.queryLanguage}:true\">\r" +
    "\n" +
    "                <a ng-click=\"block.cluster = cl\">{{cl.name}}</a>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"form-group\">\r" +
    "\n" +
    "    <label class=\"block-options-label\">Update interval (sec):</label>\r" +
    "\n" +
    "    <input type=\"number\" class=\"form-control\" ng-model=\"block.updatePeriod\" style=\"display: inline-block; width: auto;\" />\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/snippet.html',
    "<div sql-query-plugin=\"block\"></div>"
  );


  $templateCache.put('/app/modules/queryPlugins/sql/sqlQueryPlugin_control/sqlQueryPlugin.html',
    "<div class=\"query-plugin-sql\">\r" +
    "\n" +
    "    <i ng-show=\"isExecuting\" class=\"query-plugin-sql_executing-spinner\"></i>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!--query-->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <div class=\"query-plugin-sql_query-container\">\r" +
    "\n" +
    "                <span class=\"query-plugin-sql_query-prefix\">&gt;</span>\r" +
    "\n" +
    "                <div class=\"query-plugin-sql_query-input\"\r" +
    "\n" +
    "                     ui-codemirror autofocus ui-codemirror-opts=\"codeMirrorOpts\"\r" +
    "\n" +
    "                     ng-model=\"block.in\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"query-plugin-sql_query-legend\" ng-show=\"isEditorFocused\">Press Shift+Enter to execute query. Press Enter to start a new\r" +
    "\n" +
    "                    line\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!--variables-->\r" +
    "\n" +
    "    <div class=\"row query-plugin-sql_variables\" ng-if=\"block.variables.length > 0\">\r" +
    "\n" +
    "        <div class=\"form-group col-lg-4 col-md-6 col-sm-12\" ng-repeat=\"v in block.variables\">\r" +
    "\n" +
    "            <label class=\"control-label query-plugin-sql_variables__label\">{{v.label || v.name}}:\r" +
    "\n" +
    "                <input type=\"text\" class=\"form-control query-plugin-sql_variables__input\" ng-model=\"v.value\"/>\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!--result-->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <div presentation-block class=\"presentation-block\" presentation-data=\"block\" ng-if=\"block.isExecuted\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/views/blockOptions.html',
    "<h2 class=\"text-center\">Block options</h2>\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-12-10 col-md-12\">\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label class=\"block-options-label\">Language:</label>\r" +
    "\n" +
    "                <div class=\"btn-group\" dropdown>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>{{block.plugin.queryLanguage || '[select language]'}}<span class=\"caret\"></span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                        <li ng-repeat=\"pl in plugins\">\r" +
    "\n" +
    "                            <a ng-click=\"selectPlugin(pl)\">{{pl.queryLanguage}}</a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-include=\"block.plugin.blockOptionsSnippetUrl\"></div>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <p class=\"clearfix\">\r" +
    "\n" +
    "            <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/views/clusterList.html',
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <h3>\r" +
    "\n" +
    "                Saved clusters\r" +
    "\n" +
    "                <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"createNew()\">\r" +
    "\n" +
    "                    Create new <i class=\"glyphicon glyphicon-plus\"></i>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <table class=\"table\" style=\"border:1px solid #ddd;\">\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th>Name</th>\r" +
    "\n" +
    "                    <th>End point</th>\r" +
    "\n" +
    "                    <th>Path to data</th>\r" +
    "\n" +
    "                    <th>Path to error</th>\r" +
    "\n" +
    "                    <th>Language</th>\r" +
    "\n" +
    "                    <th></th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                <tr ng-repeat=\"c in list\">\r" +
    "\n" +
    "                    <td><a ng-click=\"editInDialog(c)\">{{c.name}}</a></td>\r" +
    "\n" +
    "                    <td>{{c.endPoint}}</td>\r" +
    "\n" +
    "                    <td>{{c.pathToData}}</td>\r" +
    "\n" +
    "                    <td>{{c.pathToError}}</td>\r" +
    "\n" +
    "                    <td>{{c.language}}</td>\r" +
    "\n" +
    "                    <td>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" ng-click=\"editInDialog(c)\"><i\r" +
    "\n" +
    "                                class=\"glyphicon glyphicon-pencil\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-danger\" ng-click=\"remove(c)\"><i class=\"glyphicon glyphicon-remove\"></i>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/views/editCluster.html',
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-cluster_title\">\r" +
    "\n" +
    "                <h2>Edit cluster</h2>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-cluster_content\">\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">Name:</label>\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"cluster.name\" class=\"form-control\"/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">End point:</label>\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"cluster.endPoint\" class=\"form-control\"/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">Path to data:</label>\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"cluster.pathToData\" class=\"form-control\"/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">Path to error:</label>\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"cluster.pathToError\" class=\"form-control\"/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">Language:</label>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"btn-group\" dropdown>\r" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>\r" +
    "\n" +
    "                            {{cluster.language || '- choose language -'}}<span class=\"caret\"></span>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                            <li ng-repeat=\"p in plugins\">\r" +
    "\n" +
    "                                <a ng-click=\"cluster.language = p.queryLanguage\">{{p.queryLanguage}}</a>\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-luster_buttons\">\r" +
    "\n" +
    "                <p class=\"clearfix\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\r" +
    "\n" +
    "                    <button class=\"btn btn-primary pull-right\" ng-click=\"save()\">Save</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/views/editNotebook.html',
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-notebook_title\">\r" +
    "\n" +
    "                <h2>Edit notebook</h2>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-notebook_content\">\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <label class=\"\">Name:</label>\r" +
    "\n" +
    "                    <input type=\"text\" ng-model=\"notebook.name\" class=\"form-control\"/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"edit-luster_buttons\">\r" +
    "\n" +
    "                <p class=\"clearfix\">\r" +
    "\n" +
    "                    <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\r" +
    "\n" +
    "                    <button class=\"btn btn-primary pull-right\" ng-click=\"save()\">Save</button>\r" +
    "\n" +
    "                </p>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/views/index.html',
    "<div class=\"notebook-error-message\" ng-if=\"errorMessage\">{{errorMessage}}</div>\r" +
    "\n" +
    "<div class=\"content\" ng-if=\"notebook\"  ng-class=\"{\r" +
    "\n" +
    "    'edit-mode': isEditMode,\r" +
    "\n" +
    "    'view-mode': !isEditMode\r" +
    "\n" +
    "    }\">\r" +
    "\n" +
    "    <div class=\"view-edit-buttons-container\" style=\"padding-top: 10px;\">\r" +
    "\n" +
    "        <button class=\"btn btn-success btn-sm\" ng-show=\"isEditMode\" ng-click=\"isEditMode = false;\">View</button>\r" +
    "\n" +
    "        <button class=\"btn btn-primary btn-sm\" ng-hide=\"isEditMode\" ng-click=\"isEditMode = true;\">Edit</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"block-list\">\r" +
    "\n" +
    "        <div notebook-block class=\"notebook-block\"\r" +
    "\n" +
    "             ng-class=\"{\r" +
    "\n" +
    "            'col-lg-12': block.size === 12,\r" +
    "\n" +
    "            'col-lg-8 col-md-12 col-sm-12': block.size === 8,\r" +
    "\n" +
    "            'col-lg-6 col-md-8 col-sm-12': block.size === 6,\r" +
    "\n" +
    "            'col-lg-4 col-md-6 col-sm-12': block.size === 4,\r" +
    "\n" +
    "            'col-lg-3 col-md-4 col-sm-6': block.size === 3,\r" +
    "\n" +
    "            'col-lg-2 col-md-3 col-sm-4': block.size === 2\r" +
    "\n" +
    "        }\"\r" +
    "\n" +
    "             ng-repeat=\"block in blocks\" notebook-block-model=\"block\" remove-callback=\"removeNotebookBlock\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"text-center notebook-block_buttons\">\r" +
    "\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"addBlock()\">Create new block</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/app/views/notebooks.html',
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <h3>\r" +
    "\n" +
    "                Saved notebooks\r" +
    "\n" +
    "                <button class=\"btn btn-primary btn-sm\" type=\"button\" ng-click=\"createNew()\">\r" +
    "\n" +
    "                    Create new <i class=\"glyphicon glyphicon-plus\"></i>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "            </h3>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <table class=\"table\" style=\"border:1px solid #ddd;\">\r" +
    "\n" +
    "                <colgroup>\r" +
    "\n" +
    "                    <col>\r" +
    "\n" +
    "                    <col width=\"110\">\r" +
    "\n" +
    "                </colgroup>\r" +
    "\n" +
    "                <thead>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <th>Name</th>\r" +
    "\n" +
    "                    <th></th>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                </thead>\r" +
    "\n" +
    "                <tbody>\r" +
    "\n" +
    "                <tr ng-repeat=\"n in notebooks\">\r" +
    "\n" +
    "                    <td><a ng-href=\"#/notebook/{{n.id}}\">{{n.name || \"notebook № \" + n.id}} ({{n.id}})</a></td>\r" +
    "\n" +
    "                    <td>\r" +
    "\n" +
    "                        <button class=\"btn btn-default\" ng-click=\"editInDialog(n)\"><i\r" +
    "\n" +
    "                                class=\"glyphicon glyphicon-pencil\"></i></button>\r" +
    "\n" +
    "                        <button class=\"btn btn-danger\" ng-click=\"remove(n)\"><i class=\"glyphicon glyphicon-remove\"></i>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/app/views/plotOptions.html',
    "<h2 class=\"text-center\">Plot options</h2>\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-2 col-md-12\">\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <label>Key:\r" +
    "\n" +
    "                    <select ng-model=\"block.options.key\" ng-options=\"value for value in block.options.availableKeys\">\r" +
    "\n" +
    "                        <option value=\"\">[index]</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <label>Value:\r" +
    "\n" +
    "                    <select ng-model=\"block.options.value\"\r" +
    "\n" +
    "                            ng-options=\"value for value in block.options.availableValues\">\r" +
    "\n" +
    "                        <option value=\"\">[index]</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div>\r" +
    "\n" +
    "                <label>Group by:\r" +
    "\n" +
    "                    <select ng-model=\"block.options.groupBy\"\r" +
    "\n" +
    "                            ng-options=\"value for value in block.options.availableValues\">\r" +
    "\n" +
    "                        <option value=\"\">[none]</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-10 col-md-12\">\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.multiBarChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-multi-bar-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.lineChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-line-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.pieChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.mapChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-map-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"\" ng-if=\"block.type === types.percentsChart\">\r" +
    "\n" +
    "                <div class=\"presentation-control-container-chart\" plot-percents-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"\" ng-if=\"block.type === types.bigNumberChart\">\r" +
    "\n" +
    "                <div class=\"presentation-control-container-chart\" plot-big-number-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.multiBarChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.multiBarChart)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-stats\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.lineChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.lineChart)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-picture\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.pieChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.pieChart)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-adjust\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.mapChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.mapChart)\">\r" +
    "\n" +
    "                <i class=\"icon__usa-map_14\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.percentsChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.percentsChart)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-dashboard\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.bigNumberChart}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.bigNumberChart)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-sound-5-1\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div>\r" +
    "\n" +
    "        <p class=\"clearfix\">\r" +
    "\n" +
    "            <button class=\"btn btn-default pull-right\" ng-click=\"close()\">Close</button>\r" +
    "\n" +
    "        </p>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );
 }]);});