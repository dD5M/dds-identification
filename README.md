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

## City hall integration
Adjust the idcard options seen below to match your needs.  Driverlicense cdl and motorcycle license can all use a single ID card showing endorsements for each class.  If the basic driver license is revoked the user will not have access to obtain any license.

qbx-cityhall idcard Items 
```lua
RegisterServerEvent('qbx-cityhall:createCard', function(player, url, type)
	local src = player
	local Player = QBCore.Functions.GetPlayer(src)
	local card_metadata = {}
	if not Player then return end
	card_metadata.type = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
	card_metadata.citizenid = Player.PlayerData.citizenid
	card_metadata.firstName = Player.PlayerData.charinfo.firstname
	card_metadata.lastName = Player.PlayerData.charinfo.lastname
	card_metadata.dateofbirth = Player.PlayerData.charinfo.birthdate
	card_metadata.sex = Player.PlayerData.charinfo.gender
	card_metadata.nationality = Player.PlayerData.charinfo.nationality
	card_metadata.mugshoturl = url
	card_metadata.cardtype = type
	local curtime = os.time(os.date("!*t"))
	local diftime = curtime + 2629746
	card_metadata.issuedon = os.date('%m / %d / %Y',curtime)
	card_metadata.expireson = os.date('%m / %d / %Y', diftime)
	if type == "identification" then
		local sex, identifier = Player.PlayerData.charinfo.gender
		if sex == 0 then sex = 'm' else sex = 'f' end
		card_metadata.description = ('Sex: %s | DOB: %s'):format( sex, Player.PlayerData.charinfo.birthdate )
	elseif type == "driver_license" then
		if Player.PlayerData.metadata['licences']['driver'] then
			card_metadata.driver = 'Class D'
		end
		if Player.PlayerData.metadata['licences']['bike'] then
			card_metadata.bike = "Class M"
		end
		if Player.PlayerData.metadata['licences']['cdl'] then
			card_metadata.cdl = "Class A"
		end
	elseif type == "firearms_license" then
		if Player.PlayerData.metadata['licences']['weapon'] then
			card_metadata.weapon = 'Class I'
		end
		if Player.PlayerData.metadata['licences']['weapon2'] then
			card_metadata.weapon2 = 'Class II'
		end
	elseif type == "hunting_license" then
		if Player.PlayerData.metadata['licences']['hunt'] then
			card_metadata.hunting = 'Hunting & Fishing License'
		end
    elseif type == "pilot_license" then
		if Player.PlayerData.metadata['licences']['pilot'] then
			card_metadata.pilot = 'FAA Certified'
		end
	end
	exports.ox_inventory:AddItem(src, type, 1, card_metadata)
end)
```

## Multicharacter integration
qbx-multicharacter Starter Items 
```lua
local function GiveStarterItems(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local card_metadata = {}
    card_metadata.type = Player.PlayerData.charinfo.firstname..' '..Player.PlayerData.charinfo.lastname
    card_metadata.citizenid = Player.PlayerData.citizenid
    card_metadata.firstName = Player.PlayerData.charinfo.firstname
    card_metadata.lastName = Player.PlayerData.charinfo.lastname
    card_metadata.dateofbirth = Player.PlayerData.charinfo.birthdate
    card_metadata.sex = Player.PlayerData.charinfo.gender
    card_metadata.nationality = Player.PlayerData.charinfo.nationality
    card_metadata.cardtype = 'identification'
    local curtime = os.time(os.date("!*t"))
    local diftime = curtime + 2629746
    card_metadata.issuedon = os.date('%m / %d / %Y',curtime)
    card_metadata.expireson = os.date('%m / %d / %Y', diftime)
    local sex, identifier = Player.PlayerData.charinfo.gender
    if sex == 0 then sex = 'm' else sex = 'f' end
    card_metadata.description = ('Sex: %s | DOB: %s'):format( sex, Player.PlayerData.charinfo.birthdate )
    for _, v in pairs(ksFrameworkQBcore.Shared.StarterItems) do
        if v.item == 'identification' then
            card_metadata.cardtype = 'identification'
            exports.ox_inventory:AddItem(Player.PlayerData.source, v.item, v.amount, card_metadata, nil, false)
        elseif v.item == 'driver_license' then
            card_metadata.cardtype = 'driver_license'
            card_metadata.driver = 'Class D'
            exports.ox_inventory:AddItem(Player.PlayerData.source, v.item, v.amount, card_metadata, nil, false)
        else
            exports.ox_inventory:AddItem(Player.PlayerData.source, v.item, v.amount, nil, nil, false)
        end
    end
end
```
## ox_inventory/data/items.lua

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
