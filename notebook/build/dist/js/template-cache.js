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


  $templateCache.put('/app/controls/plots/pieChart/pieChart.html',
    "<div nvd3 class=\"plot-pie-chart\" data=\"data\" options='options'></div>"
  );


  $templateCache.put('/app/controls/presentationBlock/presentationBlock.html',
    "<div class=\"row\" ng-if=\"block.error\">\r" +
    "\n" +
    "    <div class=\"col-lg-12\">\r" +
    "\n" +
    "        {{block.error}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-if=\"block.type === types.grid\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 presentation-control-container-table\" plot-grid plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-if=\"block.type === types.multiBarChart\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 presentation-control-container-chart\" plot-multi-bar-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-if=\"block.type === types.lineChart\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 presentation-control-container-chart\" plot-line-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-if=\"block.type === types.pieChart\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-if=\"block.type === types.mapChart\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 presentation-control-container-table\" plot-map-chart plot-data=\"block\">\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row presentation-block-buttons\">\r" +
    "\n" +
    "    <div class=\"col-lg-12\">\r" +
    "\n" +
    "        <div style=\"padding-left: 15px;padding-bottom: 15px;\">\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-class=\"{active: block.type === types.grid}\"\r" +
    "\n" +
    "                    ng-click=\"selectType(types.grid)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-barcode\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"btn-group dropdown-char-type\" dropdown>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default\"\r" +
    "\n" +
    "                        ng-class=\"{active: block.type !== types.grid}\"\r" +
    "\n" +
    "                        ng-click=\"selectType(prevType)\"\r" +
    "\n" +
    "                        >\r" +
    "\n" +
    "                    <i class=\"\" ng-class=\"{\r" +
    "\n" +
    "                        'glyphicon glyphicon-stats': prevType === types.multiBarChart || block.type === types.multiBarChart,\r" +
    "\n" +
    "                        'glyphicon glyphicon-picture': prevType === types.lineChart || block.type === types.lineChart,\r" +
    "\n" +
    "                        'glyphicon glyphicon-adjust': prevType === types.pieChart || block.type === types.pieChart,\r" +
    "\n" +
    "                        'icon__usa-map_14': prevType === types.mapChart || block.type === types.mapChart,\r" +
    "\n" +
    "                    }\"></i>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>\r" +
    "\n" +
    "                    <span class=\"caret\"></span>\r" +
    "\n" +
    "                    <span class=\"sr-only\">Split button!</span>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.multiBarChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-stats\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.lineChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-picture\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.pieChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-adjust\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.mapChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"icon__usa-map_14\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-hide=\"block.type == types.grid\"\r" +
    "\n" +
    "                    ng-click=\"showPlotOptions(block, plotOptions)\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-cog\"></i>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <span ng-show=\"block.updatePeriod\" style=\"padding-left: 20px; color: gray;\">Update interval: <b>{{block.updatePeriod}}</b> sec.</span>\r" +
    "\n" +
    "        </div>\r" +
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
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <div class=\"query-plugin-markdown_query-container\">\r" +
    "\n" +
    "                <span class=\"query-plugin-markdown_query-prefix\">&gt;</span>\r" +
    "\n" +
    "                <div class=\"query-plugin-markdown_query-input\"\r" +
    "\n" +
    "                     ui-codemirror autofocus ui-codemirror-opts=\"codeMirrorOpts\"\r" +
    "\n" +
    "                     ng-model=\"block.in\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <p class=\"query-plugin-markdown_query-legend\">Press Shift+Enter to convert markdown to HTML. Press Enter to start a new\r" +
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
    "    <!--result-->\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
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
    "                <p class=\"query-plugin-sql_query-legend\">Press Shift+Enter to execute query. Press Enter to start a new\r" +
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
    "                <label>Language:</label>\r" +
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
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label>Cluster:</label>\r" +
    "\n" +
    "                <div class=\"btn-group\" dropdown>\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>{{block.cluster.name}}<span class=\"caret\"></span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                    <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                        <li ng-repeat=\"cl in block.allClusters\">\r" +
    "\n" +
    "                            <a ng-click=\"block.cluster = cl\">{{cl.name}}</a>\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"form-group\">\r" +
    "\n" +
    "                <label>Update interval (sec):</label>\r" +
    "\n" +
    "                <input type=\"number\" class=\"form-control\" ng-model=\"block.updatePeriod\" style=\"display: inline-block; width: auto;\" />\r" +
    "\n" +
    "            </div>\r" +
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


  $templateCache.put('/app/views/index.html',
    "<div class=\"container-fluid\" ng-class=\"{\r" +
    "\n" +
    "    'edit-mode': isEditMode,\r" +
    "\n" +
    "    'view-mode': !isEditMode\r" +
    "\n" +
    "}\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\" style=\"padding-top: 10px;\">\r" +
    "\n" +
    "            <button class=\"btn btn-success btn-sm\" ng-show=\"isEditMode\" ng-click=\"isEditMode = false;\">View</button>\r" +
    "\n" +
    "            <button class=\"btn btn-primary btn-sm\" ng-hide=\"isEditMode\" ng-click=\"isEditMode = true;\">Edit</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
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
    "            'col-lg-3 col-md-4 col-sm-6': block.size === 3\r" +
    "\n" +
    "        }\"\r" +
    "\n" +
    "             ng-repeat=\"block in blocks\" notebook-block-model=\"block\" remove-callback=\"removeNotebookBlock\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div style=\"margin: 10px 0;\" class=\"text-center notebook-block_buttons\">\r" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"addBlock()\">Create new block</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
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
    "            <div class=\"btn-group dropdown-char-type\" dropdown>\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default\"\r" +
    "\n" +
    "                        ng-class=\"{active: block.type !== types.grid}\"\r" +
    "\n" +
    "                        ng-click=\"selectType(prevType)\"\r" +
    "\n" +
    "                        >\r" +
    "\n" +
    "                    <i class=\"glyphicon\" ng-class=\"{\r" +
    "\n" +
    "                        'glyphicon-stats': prevType === types.multiBarChart,\r" +
    "\n" +
    "                        'glyphicon-picture': prevType === types.lineChart,\r" +
    "\n" +
    "                        'glyphicon-adjust': prevType === types.pieChart,\r" +
    "\n" +
    "                    }\"></i>\r" +
    "\n" +
    "                    <i class=\"icon__usa-map_14\"  ng-show=\"prevType === types.mapChart\"></i>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" dropdown-toggle>\r" +
    "\n" +
    "                    <span class=\"caret\"></span>\r" +
    "\n" +
    "                    <span class=\"sr-only\">Split button!</span>\r" +
    "\n" +
    "                </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.multiBarChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-stats\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.lineChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-picture\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.pieChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"glyphicon glyphicon-adjust\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                    <li ng-click=\"selectType(types.mapChart)\" class=\"text-center menu-item\">\r" +
    "\n" +
    "                        <i class=\"icon__usa-map_14\"></i>\r" +
    "\n" +
    "                    </li>\r" +
    "\n" +
    "                </ul>\r" +
    "\n" +
    "            </div>\r" +
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
    "            <div class=\"row\" ng-if=\"block.type === types.lineChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-line-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.pieChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-pie-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"block.type === types.mapChart\">\r" +
    "\n" +
    "                <div class=\"col-lg-12 presentation-control-container-chart\" plot-map-chart plot-data=\"block\">\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
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