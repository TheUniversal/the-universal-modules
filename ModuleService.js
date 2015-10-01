'use strict';

import modules from './Modules';

let activeModule = null;

const getModule = (moduleName) => {
    let connectorModule = modules[moduleName];

    try {
        return connectorModule();
    } catch (error) {
        throw new Error("Module not found", moduleName);
    }
};

export default class ModuleService {

    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    loadModule(moduleName) {
        activeModule = getModule(moduleName)(this.dispatcher);
        console.log('Loaded module: ', activeModule.name);

        activeModule.onActivateModule();
        this.dispatcher.onActivateModule(this.getModuleInfo());
        console.log('Activated module: ', activeModule.name);
    }

    unloadModule(){
        console.log('Deactivating module: ', activeModule.name);
        activeModule.onDeactivateModule();
        activeModule = null;
    }

    getModuleInfo() {
        if (!activeModule) { return null }

        return {
            name: activeModule.name,
            supportedCommands: activeModule.supportedCommands
        }
    }

    updatePlaybackState(command) {
        console.log('Playback: ', command);
        activeModule.onPlaybackCommand(command);
    }

    updateVolumeLevel(command){
        console.log('Volume change: ', command);
        activeModule.onVolumeChange(command);
    }
}


