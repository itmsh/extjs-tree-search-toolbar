Ext.define('MyApp.view.base.TreeSearchToolbar', {
    
    extend: 'Ext.toolbar.Toolbar',
    
    xtype: 'treeSearchToolbar',
    
    controller: 'TreeSearchToolbarController', 
    
    viewModel: {
        data: {
            current: 0,
            ofAll: 0
        }
    },
    
    items: [
        {
            xtype: 'textfield',
            reference: 'searchFieldProduct',
            name: 'search',
            width: 250,
            emptyText: 'Enter something to search',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onKeyUpSearch'
            }
        },
        {
            xtype: 'button',
            text: 'search',
            handler: 'onSearchProduct',
            reference: 'searchBtn'
        },{
            xtype: 'tbtext',
            bind: {
                text: '{current} of {ofAll}'
            }
        },
        {
            xtype: 'button',
            text: 'Pre',
            handler: 'showPre',
            reference: 'showPre',
            disabled: true
        },
        {
            xtype: 'button',
            text: 'Next',
            handler: 'showNext',
            reference: 'showNext',
            disabled: true
        }                         
    ]
    
    
    
});
