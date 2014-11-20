define(function(require){
    require('./ngModule');
    require('./routes');
    require('./controllers/indexController');
    require('./controls/presentationBlock/presentationBlock');
    require('./controls/notebookBlock/notebookBlock');
    require('./controls/plots/grid/grid');
    require('./controls/plots/multiBarChart/multiBarChart');
    require('./controls/plots/lineChart/lineChart');
    require('./controls/plots/pieChart/pieChart');
    require('./controls/plots/mapChart/mapChart');
});