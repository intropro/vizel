<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notebook</title>

    <!-- build:template
    <% if (environment === 'dev') { %>
    <link rel="stylesheet" href="<%= css_path_dev %>">
    <% } else { %>
    <link rel="stylesheet" href="<%= css_path_dist %>">
    <% } %>
    /build -->
</head>
<body ng-controller="AppController">

<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">

            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>

            </button>
            <a class="navbar-brand" href="#/" style="margin-right: 25px;" ng-click="onMenuSelected()"><img src="/app/img/vizel.png"/></a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-left">
                <li><a href="#/notebook">Notebooks</a></li>
                <li><a href="#/backends">Backends</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" style="margin-right: 0;margin-left: 0;" ng-show="showNotebookButtons">
                <li style="display:none; margin-right:10px;" ng-style="{display:''}">
                    <button class="btn btn-sm navbar-btn" ng-class="{'active': isEnableUpdateIntervals, 'btn-success': isEnableUpdateIntervals}" ng-click="changeIntervals()">Update intervals:{{isEnableUpdateIntervals ? 'ON' : 'OFF'}}</button>
                </li>
                <li style="display:none;" ng-style="{display:''}">
                    <button class="btn btn-sm navbar-btn" ng-class="{'active': isViewMode, 'btn-success': isViewMode}" ng-click="changeViewMode()">View mode:{{isViewMode ? 'ON' : 'OFF'}}</button>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="content-wrapper" ng-view>
</div>
<!--<footer class="footer text-center">© 2014 - Intropro.</footer>-->



<!-- build:template
<% if (environment === 'dev') { %>
<script src="<%= js_path_dev %>" data-main="app/entry"></script>
<% } else { %>
<script src="<%= js_path_dist %>"></script>
<% } %>
/build -->

</body>
</html>
