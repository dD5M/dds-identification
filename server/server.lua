local QBCore = exports['qbx-core']:GetCoreObject()

-- Server event to call open identification card on valid players
RegisterServerEvent('dds-identification:server:showID', function(item, players)
	if #players > 0 then 
		for _,player in pairs(players) do 
			TriggerClientEvent('dds-identification:openID', player, item)
		end 
	end 
end)

