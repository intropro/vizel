define(function (require) {
    var angular = require('angular');
    var jsPlumb = require('jsPlumb');
    var $ = require('jquery');

    angular.module('jsPlumb', [])
        .directive('jsPlumbContainer', function () {
            return {
                restrict: 'A',
                scope: {
                    options: '=',
                    onConnection: '&',
                    onBeforeConnection: '&',
                    onConnectionDetached: '&',
                    onBeforeDetach: '&'
                },
                controller: function ($scope, $element, $q) {
                    var opts = angular.extend({
                        Endpoint: [
                            "Dot",
                            {
                                radius: 2
                            }
                        ],
                        //Endpoint: ["Blank", {radius: 1}],
                        HoverPaintStyle: {
                            strokeStyle: "#1e8151",
                            lineWidth: 2
                        },
                        ConnectionOverlays: [
                            [ "Arrow", {
                                width: 9,
                                location: 1,
                                id: "arrow",
                                length: 13,
                                foldback: 0.8
                            } ],
                            //[ "Label", { label: "Connecting...", id: "label", cssClass: "aLabel" }]
                            [
                                "Label",
                                {
                                    label: "",
                                    id: "label",
                                    cssClass: ""
                                }
                            ]
                        ],
                        Container: $element
                    }, $scope.options);

                    $scope.nodeList = [];

                    var isInitializing = false;
                    var instanceDefer = $q.defer();
                    var instance = null;

                    this.getInstance = function () {
                        var defer = $q.defer();
                        if (instance) {
                            defer.resolve(instance);
                        } else if (!isInitializing) {
                            isInitializing = true;
                            jsPlumb.ready(function () {

                                instance = jsPlumb.getInstance(opts);

                                instance.bind("connection", onConnection.bind(this));

                                instance.bind("beforeDrop", onBeforeDrop.bind(this));

                                instance.bind("connectionDetached", onConnectionDetached);

                                instance.bind("click", function (conn) {
                                    if ($.isFunction($scope.onBeforeDetach)) {
                                        $scope.onBeforeDetach({
                                            connection: conn
                                        }).then(function () {
                                            instance.detach(conn);
                                        });
                                    } else {
                                        instance.detach(conn);
                                    }
                                });

                                $element.data('jsPlumbInstance', instance);
                                instanceDefer.resolve(instance);
                                defer.resolve(instance);
                            });
                        } else {
                            instanceDefer.promise.then(function (instance) {
                                defer.resolve(instance);
                            });
                        }

                        return defer.promise;
                    };

                    this.registerNode = function (data, element) {
                        if ($scope.nodeList.some(function (n) {
                            return n.element === element;
                        })) {
                            return;
                        }
                        $scope.nodeList.push({node: data, element: element});
                    };

                    this.getNodes = function () {
                        return $scope.nodeList;
                    };

                    this.getNode = function (nodeId) {
                        var result = $scope.nodeList.filter(function (n) {
                            return n.node.id === nodeId;
                        })[0];

                        return result;
                    };


                    /**
                     * Notification a Connection was established.
                     *
                     * @param {object} info
                     * @param {jsPlumb.Connection} info.connection  - the new Connection. you can register listeners on this etc.
                     * @param {string} info.sourceId: - id of the source element in the Connection
                     * @param {string} info.targetId:  - id of the target element in the Connection
                     * @param {HTMLElement} info.source: - the source element in the Connection
                     * @param {HTMLElement} info.target - the target element in the Connection
                     * @param {jsPlumb.Endpoint} info.sourceEndpoint - the source Endpoint in the Connection
                     * @param {jsPlumb.Endpoint} info.targetEndpoint - the targetEndpoint in the Connection
                     * }
                     */
                    function onConnection(info) {
                        var from = $(info.source).data('node');
                        var to = $(info.target).data('node');
                        setTimeout(function () {
                            $scope.onConnection({
                                info: {
                                    connection: info.connection,
                                    from: from,
                                    to: to
                                }
                            });

                        }, 0);
                    }

                    function onBeforeDrop(info) {
                        /*
                         var from = $(info.source).data('node');
                         var to = $(info.target).data('node');
                         return $scope.onBeforeConnection({
                         info: {from: from, to: to}
                         });
                         */
                        return true;
                    }

                    /**
                     * Notification a Connection was detached
                     *
                     * @param {object} info
                     * @param {jsPlumb.Connection} info.connection - the new Connection. you can register listeners on this etc.
                     * @param {string} info.sourceId - id of the source element in the Connection
                     * @param {string} info.targetId - id of the target element in the Connection
                     * @param {HTMLElement} info.source - the source element in the Connection
                     * @param {HTMLElement} info.target - the target element in the Connection
                     * @param {jsPlumb.Endpoint} info.sourceEndpoint - the source Endpoint in the Connection
                     * @param {jsPlumb.Endpoint} info.targetEndpoint - the targetEndpoint in the Connection
                     * @param {object=} originalEvent
                     */
                    function onConnectionDetached(info, originalEvent) {
                        $scope.onConnectionDetached({
                            info: info
                        });
                    }
                }
            };
        })
        .directive('jsPlumbItem', function () {
            return {
                require: '^jsPlumbContainer',
                restrict: 'A',
                scope: {
                    draggableOptions: '=',
                    options: '=',
                    node: '='
                },
                controller: function ($scope) {
                    this.getNode = function () {
                        return $scope.node;
                    }
                },
                link: function (scope, element, attrs, requires) {
                    var jsPlumbContainerCtrl = requires;
                    jsPlumbContainerCtrl.getInstance().then(function (instance) {
                        var opts = angular.extend({
                            anchor: 'Continuous',
                            maxConnections: 5
                        }, scope.options);

                        var draggableOpts = angular.extend({
                            containment: 'parent',
                            stop: function (e) {
//                                debugger;
                                var position = element.position();
                                scope.node.position.top = position.top;
                                scope.node.position.left = position.left;
                            }
                        }, scope.draggableOptions);

                        instance.draggable(element, draggableOpts);
                        instance.makeTarget(element, opts);
                        element.data("node", scope.node);


                        jsPlumbContainerCtrl.registerNode(scope.node, element);

                        scope.$watch('node.position.left', function (newValue, oldValue, scope) {
                            instance.repaint(element);
                        });
                        scope.$watch('node.position.top', function (newValue, oldValue, scope) {
                            instance.repaint(element);
                        });
                    });
                }
            };
        })
        .directive('jsPlumbConnect', function () {
            return {
                restrict: 'A',
                replace: true,
                require: ['^jsPlumbContainer', '^jsPlumbItem'],
                scope: {
                    options: '='
                },
                link: function (scope, element, attrs, requires) {
                    var jsPlumbContainerCtrl = requires[0];
                    var itemCtrl = requires[1];
                    jsPlumbContainerCtrl.getInstance().then(function (instance) {
                        instance.makeSource(element, angular.extend({
                            parent: $(element).parent(),
                            anchor: 'Continuous',
                            connector: [
                                "Flowchart",
                                {
                                    curviness: 1
                                }
                            ],
                            connectorStyle: {
                                strokeStyle: "#5c96bc",
                                lineWidth: 2,
                                outlineColor: "transparent",
                                outlineWidth: 4
                            },
                            maxConnections: 5,
                            onMaxConnections: function (info) {
                                alert("Maximum connections (" + info.maxConnections + ") reached");
                            }
                        }, scope.options));
                    });
                }
            };
        })
        .directive('jsPlumbRemove', function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {
                    jsPlumbRemove: "=",
                    removeCallback: "&",
                    afterRemoveCallback: "&"
                },
                require: '^jsPlumbContainer',
                link: function (scope, element, attrs, jsPlumbContainer) {
                    element.on('click', function () {
                        jsPlumbContainer.getInstance().then(function (instance) {
                            if ($.isFunction(scope.removeCallback)) {
                                scope.removeCallback({
                                    node: scope.jsPlumbRemove
                                }).then(function () {
                                    instance.detachAllConnections(element.parent());
                                    scope.afterRemoveCallback({
                                        node: scope.jsPlumbRemove
                                    })
                                });
                            }

                        });
                    });
                }
            };
        })
        .directive('jsPlumbConnections', function () {
            return {
                restrict: 'A',
                scope: {
                    connections: '='
                },
                require: '^jsPlumbContainer',
                link: function (scope, element, attrs, jsPlumbContainer) {
                    setTimeout(connect, 0);

                    scope.$watchCollection('connections', connect);

                    function connect() {
                        jsPlumbContainer.getInstance().then(function (instance) {
                            //instance.detachEveryConnection();
                            var existedConnections = instance.getConnections();
                            var scopeConnections = (scope.connections || []);
                            scopeConnections.forEach(function (c) {
                                var connectionObject = c.$connection;
                                if (connectionObject && existedConnections.indexOf(connectionObject) > -1) {
                                    return;
                                }
                                var fromId = c.from;
                                var toId = c.to;
                                var fromNode = jsPlumbContainer.getNode(fromId);
                                var toNode = jsPlumbContainer.getNode(toId);
                                if (fromNode && toNode) {
                                    c.$connection = instance.connect({
                                        source: fromNode.element,
                                        target: toNode.element
                                    });
                                }
                            });

                            existedConnections.forEach(function (connection) {
                                if (!scopeConnections.some(function (conn) {
                                    return conn.$connection === connection;
                                })) {
                                    instance.detach(connection);
                                }
                            });
                        });
                    }
                }
            };
        })
});