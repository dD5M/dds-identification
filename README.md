# dds-identification
An identification card resource modified for ox_inventory for QBox Framework.

# This is an adaptation of qidentification for the QBox framework. [QuantusRP](https://github.com/QuantusRP/qidentification)
# All credits goes to [Noms](https://github.com/OfficialNoms) for creating this script first.

This resource was inspired by the original jsfour identification script and still uses some of the javascript from it. The rest of the LUA is entirely re-written.

![ID Card Preview](https://i.imgur.com/PxVi8jK.png)

# Dependencies
## Hard Dependencies
These are required resources that this resource was built around. It's not designed to work without these resources and if you want to remove the requirement for them you'll be better off writing your own resource rather than try to remove those dependencies from this resource. 
* [QBox](https://github.com/Qbox-project)
* [ox_inventory](https://github.com/overextended/ox_inventory)
* [MugShotBase64](https://github.com/BaziForYou/MugShotBase64)

# Installation
1. Drag and drop into your resource folder
2. Make sure you install the required dependencies (listed above)
3. Follow the instructions to install the other resources - especially the mugshot one for the imgur API
4. Done!


# Config / Disclaimer
## Cards Types 
I've done my best to provide a configurable resource. You are able to add your own identification types to this list however it's not just just plug and play, you'll still need to modify the server event and the js events for additional 

You'll have to make sure that the list reflects the items that are available for you and your server, along with your own costs.

## The rest of the config is pretty heavily commented, so it should be self explanatory. 

## ox_inventory/data/items.lua
```lua
	['identification'] = {
		label = 'Identification',
		weight = 0,
		stack = false,
		close = true,
		consume = 0,
		client = {
			export = 'dds-identification.identification'
		}
	},
	['drivers_license'] = {
		label = 'Drivers License',
		weight = 0,
		stack = false,
		close = true,
		consume = 0,
		client = {
			export = 'dds-identification.identification'
		}
	},
	['firearms_license'] = {
		label = 'Firearms License',
		weight = 0,
		stack = false,
		close = true,
		consume = 0,
		client = {
			export = 'dds-identification.identification'
		}
	},
```
