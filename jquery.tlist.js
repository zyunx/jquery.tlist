/**
 jquery.tlist - create a data list html structure using template.

 author: zyun
 created: 2016-07-10
*/
(function ($) {
    $.fn.tlist = function (method) {
        var methods = {
            'init': function (options) {
                return this.each(function () {
                    var listDOM = this;
                    listDOM.settings = $.extend({}, $.fn.tlist.defaults, options);
                    
                    if (listDOM.initialized)
                        return;
                    
                    var theTlist = $(this);
                    theTlist.on('click', '.tlist-add', function () {
                        //console.log('tlist-add');
                        var inst = $(theTlist.find('.tlist-template').html());

                        if (typeof listDOM.settings.beforeAdd == 'function')
                            listDOM.settings.beforeAdd(inst);

                        inst.addClass('tlist-instance');
                        inst.appendTo(theTlist.find('.tlist-main'));

                        if (typeof listDOM.settings.afterAdd == 'function')
                            listDOM.settings.afterAdd(inst);

                        return false;
                    });

                    theTlist.on('click', '.tlist-remove', function () {
                        //console.log('tlist-remove');
                        $(this).closest('.tlist-instance').remove();

                        return false;
                    });
                    
                    listDOM.initialized = true;
                });
            },
            'changeName': function () {
                return this.each(function () {
                    console.log('change name ' + this.settings.hello);
                })
            }
        };
        
        
        if (typeof method === 'object') {
            methods['init'].apply(this, arguments);
        } else  if (typeof method === 'string') {
            if (methods[method])
                methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
    
    $.fn.tlist.defaults = {
        beforeAdd: function () {}, // before a template's instance is add to the DOM
        afterAdd: function () {}, // after a templates instance is add to the DOM
    }
})(jQuery);
