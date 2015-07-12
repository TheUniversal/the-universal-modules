'use strict';

var modules = {
    mockPlayer: require('the-universal-common/mock/MockPlayerModule'),
    foobar2000:  require('tum-foobar2000')
};

module.exports = function ModuleRegistry() {
    
    return {
        getModule: function(moduleName, dispatcher){
            var Module = modules[moduleName];

            if (!Module) {
                throw new Error("Module not found", moduleName);
            }

            return Module(dispatcher);
        }
    }
};
