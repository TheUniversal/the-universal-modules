'use strict';

var modules = {
    mockPlayer: function () {
        return require('the-universal-common/mock/MockPlayerModule');
    },
    foobar2000: function () {
        return require('tum-foobar2000');
    },
    itunes : function () {
        return require('tum-itunes');
    }
};

module.exports = function ModuleRegistry() {
    
    return {
        getModule: function(moduleName, dispatcher){
            var module = modules[moduleName];

            try {
                return module()(dispatcher);
            } catch (error) {
                throw new Error("Module not found", moduleName);
            }
        }
    }
};
