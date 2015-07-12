'use strict';

var moduleRegistry = require('./ModuleRegistry')();

var activeModule;

function getModuleInfo() {
    if (!activeModule) { return null }

    return {
        name: activeModule.name,
        supportedCommands: activeModule.supportedCommands
    }
}

module.exports = function ModuleService(dispatcher) {

    return {
        loadModule: function (moduleName) {
            activeModule = moduleRegistry.getModule(moduleName, dispatcher);
            console.log('Loaded module: ', activeModule.name);

            activeModule.onActivateModule();
            dispatcher.onActivateModule(getModuleInfo());
            console.log('Activated module: ', activeModule.name);
        },

        unloadModule: function(){
            console.log('Deactivating module: ', activeModule.name);
            activeModule.onDeactivateModule();
            activeModule = null;
        },

        getModuleInfo: getModuleInfo,

        updatePlaybackState: function (command) {
            console.log('Playback: ', command);
            activeModule.onPlaybackCommand(command);
        },

        updateVolumeLevel: function (command) {
            console.log('Volume change: ', command);
            activeModule.onVolumeChange(command);
        }
    }
};


