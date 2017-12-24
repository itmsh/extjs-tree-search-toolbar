Ext.define('MyApp.view.base.TreeSearchToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TreeSearchToolbarController',    
    
    onSearchProduct: function(){
        
        var me = this,
            view = me.getView(),
            tree = view.up(),
            store = tree.getStore(),
            searchFieldProduct = me.lookupReference('searchFieldProduct'),
            searchBtn = me.lookupReference('searchBtn');
    
        me.lookupReference('showNext').disable();
        me.lookupReference('showPre').disable();
         
        searchBtn.disable();
        searchBtn.setText('searching ...');
           
        Ext.Ajax.request({
            url: view.searchUrl,
            params : {
                stringToSearch: searchFieldProduct.getValue(),
                productType: tree.estateMaterials,
                status: 'active'
            },
            success: function(response, opts) {
                
                var obj = Ext.decode(response.responseText);
                
                var path = '';
                
                searchBtn.enable();
                searchBtn.setText('search');
                
                if(obj.data){
                    me.lengthOfPathes = obj.count;    
                    me.arrayOfPathes = obj.data; 
                    Ext.toast(' '+me.lengthOfPathes+' Founded');
                    me.getViewModel().set('ofAll', me.lengthOfPathes); 
                    me.getViewModel().set('current', 0); 
                    me.showNext();
                    
                    
                }
                                                
            },
            failure: function(response, opts) {
                searchBtn.enable();
                searchBtn.setText('search');
            }
        });
                
    },
    
    onKeyUpSearch: function(com, event){
        
        var me = this,
            view = me.getView();
    
        if(event.getKeyName() == "ENTER"){
            me.onSearchProduct();
        }
        
    },    
    
    showNext: function(){
        
        var me = this;
        var current = me.getViewModel().get('current'); 
        
        current++;
        
        if(me.lengthOfPathes>=current){
            
            me.selectCurrent(current);
            
            if(current>1){
                me.lookupReference('showPre').enable();
            }
            if(me.lengthOfPathes==current){
                me.lookupReference('showNext').disable();
            }else{
                me.lookupReference('showNext').enable();
            }
            
        }
        
                
    },
    
    showPre: function(){
        
        var me = this;
        var current = me.getViewModel().get('current'); 
        
        current--;
        
        if(current>0){
            me.selectCurrent(current);
            me.lookupReference('showNext').enable();
        }
        if(current == 1){
            me.lookupReference('showPre').disable();
        }
        
                
    },
    selectCurrent: function(current){
        
        var me = this,
            view = me.getView(),
            tree = view.up();    
    
            me.getViewModel().set('current', current);
                        
        tree.ensureVisible(me.arrayOfPathes[(current-1)].path, {
            animate: true,
            highlight: true,
            select: true
        });
        
    }
    
});
