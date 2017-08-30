import addPluginReal from './addPluginReal';
import co from 'co';
function addPlugin(appPlugin){
    var pluginPre = '../../plugin/node_modules/';
    return co(function *() {
        var plugin = appPlugin;
        if( typeof plugin !='undefined' && plugin.length != 0){
            //为了兼容以前的"cordova-plugin-app-version,cordova-plugin-camera,cordova-plugin-device"类型
            try {
                plugin = JSON.parse(plugin);
            }catch (e){
                plugin = plugin.split(',');
            }
            // plugin = plugin.split(',');
            // plugin = JSON.parse(plugin);
            console.log(plugin);
            //分类
            var pluginWithVariable = [];
            var pluginWithoutVariable = [];
            var customPluginReg = /^https?:\/\/(www\.)?/i;
            for(var i=0;i<plugin.length;i++){
                if(plugin[i].indexOf('?') === -1){
                    if(customPluginReg.test(plugin[i].toString())){
                        pluginWithoutVariable.push(plugin[i].toString());
                    } else {
                        pluginWithoutVariable.push(pluginPre + plugin[i].toString());
                    }
                }else{
                    if(customPluginReg.test(plugin[i].toString())){
                        pluginWithVariable.push(plugin[i].toString());
                    } else {
                        pluginWithVariable.push(pluginPre + plugin[i].toString());
                    }
                }
            }
            console.log(pluginWithoutVariable,pluginWithVariable);
            if(pluginWithVariable.length !== 0) {
                for(var i=0;i<pluginWithVariable.length;i++){
                    //拆分plugin 和 variable
                    var plugin = pluginWithVariable[i].toString();
                    var pluginName = plugin.split('?')[0].toString();
                    var pluginVariable = plugin.split('?')[1];
                    //toJson
                    var variable = {};
                    variable.cli_variables = {};
                    pluginVariable.split('&').forEach(function(v){
                        variable.cli_variables[v.split('=')[0]] = v.split('=')[1];
                    });
                    console.log((pluginName,variable));
                    yield addPluginReal(pluginName,variable);
                }
            }
            //添加
            if(pluginWithoutVariable.length !== 0){
                yield addPluginReal(pluginWithoutVariable);
            }
        }
    });
};
export default addPlugin;

