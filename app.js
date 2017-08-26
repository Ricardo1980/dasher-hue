var config = require('./config/config.json')
var dashButton = require('node-dash-button');
var hue = require("node-hue-api");
var HueApi = hue.HueApi;
var buttons = [];
var hostname = config.philips_hue.ipaddress;
var username = config.philips_hue.username;
var api = new HueApi(hostname, username);

function doLog(message) {
	console.log('[' + (new Date().toISOString()) + '] ' + message);
}

var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

function DasherButton(button, api) {
	this.dashButton = dashButton(button.address, null, null, 'all')
	doLog("'" + button.name + "' button added.")
	this.dashButton.on("detected", function () {
		if (button.group) {
			doLog("'" + button.name + "' button pressed. Toggling group " + button.group + ".")
			toggleGroup(button.group, api);
		} else if (button.light) {
			doLog("'" + button.name + "' button pressed. Toggling light " + button.light + ".")
			toggleLight(button.light, api);
		} else {
			doLog("'" + button.name + "' button pressed, but there is no light or group to toggle.")
		}
	})
}

// Reads a group state, then reverses it
function toggleGroup(group, api) {
	api.getGroup(group, function (err, result) {
		if (err) throw err;
		//displayResults(result);
		api.setGroupLightState(group, { "on": !result.lastAction.on }, function (err, result) {
			if (err) throw err;
		});
	});
}

// Reads a light state, then reverses it
function toggleLight(light, api) {
	api.getLightStatus(light, function (err, result) {
		if (err) throw err;
		//displayResults(result);
		api.setLightState(light, { "on": !result.state.on }, function (err, result) {
			if (err) throw err;
		});
	});
}

// Creates as many buttons as we have in the config file
for (var i = 0; i < config.buttons.length; i++) {
	button = config.buttons[i]
	buttons.push(new DasherButton(button, api))
}
