# dasher-hue

dasher-hue is a simple way to bridge your Amazon Dash buttons to Philips Hue lights.
This small project is just a combination of two existing projects:

[node-hue-api](https://github.com/peter-murray/node-hue-api)
[dasher](https://github.com/maddox/dasher)

See it in action:

[![IMAGE ALT TEXT](https://i.vimeocdn.com/video/651991389_640.webp)](https://vimeo.com/231230932)


## How it works

Configure dasher-hue via `config/config.json`.
You have to setup your Philips Hue (IP and username) and all the Amazon Dash Buttons you have.


## Configuration

You define your buttons via the `config/config.json` file.
You attach each button to a specific group or a specific light, what you prefer.

Here's an example.

```json
{
  "philips_hue": {
    "ipaddress": "192.168.0.10",
    "username": "your-philips-hue-username-key"
  },
  "buttons":[
  {
    "name": "Amazon Dash Fiesta Living Room",
    "address": "50:50:50:50:50:51",
    "group": "1"
  },
  {
    "name": "Amazon Dash Rodial Bedroom",
    "address": "50:50:50:50:50:52",
    "group": "2"
  },
  {
    "name": "Amazon Dash ON Corridor",
    "address": "50:50:50:50:50:53",
    "light": "6"
  }
]}
```

Buttons take 4 options.

* `name` - Give the button action a name, just for informative purposes.
* `address` - The MAC address of the button.
* `group` - The number or the group you want to toggle. When using this, you don't use `light`.
* `light` - The number or the light you want to toggle. When using this, you don't use `group`.


## Amazon Dash Button tips.

* Use DHCP Reservation on your Amazon Dash Button to lower the latency from ~5s to ~1s.
* Dash buttons cannot be used for another ~10 seconds after they've been pressed.


## Setup

In order to get your Amazon Dash Button mac address, get instructions and scripts from here

Check Setup section [here](https://github.com/maddox/dasher)

Set up dasher-hue.

    git clone https://github.com/Ricardo1980/dasher-hue
    cd dasher-hue
    npm install

Then create a `config.json` in `/config` to set up your Dash buttons. Or use the the sample file, renaming it and modifying according to your needs.


## Launching it

Listening for Amazon Dash Buttons requires root. So you need to start dasher-hue with sudo.

    sudo npm run start


### Auto Start on Raspberry Pi Zero (or other Linux distributions)

For creating and setting up a service, check [this](https://www.axllent.org/docs/view/nodejs-service-with-systemd).

An example could be:
```
[Unit]
Description=dasher-hue

[Service]
ExecStart=/usr/local/bin/node /home/pi/dasher-hue/app.js
Restart=always
 # Restart service after 10 seconds if node service crashes
 RestartSec=10
 # Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=dasher-hue
Environment=NODE_ENV=production PORT=1337

[Install]
WantedBy=multi-user.target
```
In /etc/systemd/system/dasher-hue.service 
And then use 
```
sudo systemctl enable dasher-hue.service
sudo systemctl start dasher-hue.service
```

### Improvements

Locate Philips Hue Bridge automatically, rather than using an IP.
Check:
nupnpSearch(), locateBridges(), upnpSearch or searchForBridges()
