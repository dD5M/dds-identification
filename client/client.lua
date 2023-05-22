local QBCore = exports['qbx-core']:GetCoreObject()

-- When (re)starting the resource, make sure we turn these state bags off just to be safe
LocalPlayer.state:set('idshown',false,false)
LocalPlayer.state:set('idvisible',false,false)

-- Register a keymapping for the "stop" command (to close the id)
RegisterKeyMapping('cancelid', 'Cancel Action', 'keyboard', 'x')

-- Register an empty 'stop' command for future use
RegisterCommand('cancelid', function()
	-- empty the command
end)

exports('identification', function(data, slot)
	if not LocalPlayer.state.idshown  then 
		exports['ox_inventory']:useItem(data, function(data)
			if data then
				TriggerEvent('dds-identification:showID',data)
			end
		end)
	else
        lib.notify({title = 'License is in cooldown.', type = 'error'})
	end
end)


-- Event to show your ID to nearby players
RegisterNetEvent('dds-identification:showID', function(item)
	if not LocalPlayer.state.idshown  then 
		local playersInArea = lib.getNearbyPlayers(GetEntityCoords(PlayerPedId()), Config.DistanceShowID)
		-- loop through players in area and show them the id
		if #playersInArea > 0 then 
			local Playerinareaid = {} -- Probably a better way of doing this, feel free to fix this :) -PERPGamer
			for i = 1, #playersInArea do
				table.insert(Playerinareaid, GetPlayerServerId(playersInArea[i].id))
			end
			TriggerServerEvent('dds-identification:server:showID',item,Playerinareaid)
			TriggerEvent('dds-identification:openID',item)
		end
		-- set a flag 
		LocalPlayer.state:set('idshown',true,false)
		-- open it for yourself too
		TriggerEvent('dds-identification:openID',item)
		Citizen.CreateThread(function()
			-- Fire and forget cooldown
			Citizen.Wait(Config.ShowIDCooldown * 1000)
			LocalPlayer.state:set('idshown',false,false) -- Doesn't need to be replicated to the server
		end)
	end 
end)

-- Event to show your ID to nearby players
RegisterNetEvent('dds-identification:openID', function(item)
	if LocalPlayer.state.idvisible == nil or not LocalPlayer.state.idvisible then 
		TriggerEvent('dds-identification:showUI',item)
	end 
end)

-- NUI Events 
-- We define a "stop" command inside this too
RegisterNetEvent('dds-identification:showUI', function(data)
	LocalPlayer.state:set('idvisible',true,false)
	SendNUIMessage({
		action = "open",
		metadata = data.metadata
	})
	RegisterCommand('cancel', function()
		SendNUIMessage({
			action = "close"
		})
		LocalPlayer.state:set('idvisible',false,false)
		-- Once the NUI is closed, we redefine the command to do nothing again, so it can be used by other resources
		RegisterCommand('cancel', function()
			-- empty the command
		end)
	end)
end)

-- Backup command to force close any id shown on your screen (in case something breaks)
RegisterCommand('closeidentification',function()
	SendNUIMessage({
		action = "close"
	})
	LocalPlayer.state:set('idvisible',false,false)
end)

