fx_version 'cerulean'

name 'dds-identification'
description 'Edited version of qIdentification for qBox/QBcore and ox_inventory'

author 'Noms'
game 'gta5'
lua54 'yes'

ui_page 'html/index.html'

shared_scripts {
    '@ox_lib/init.lua',
	'config.lua'
}


server_scripts {
	'server/*.lua'
}

client_scripts {
	'client/*.lua'
}

files {
	'html/index.html',
	'html/assets/css/*.css',
	'html/assets/js/*.js',
	'html/assets/fonts/roboto/*.woff',
	'html/assets/fonts/roboto/*.woff2',
	'html/assets/fonts/justsignature/JustSignature.woff',
	'html/assets/images/*.png'
}
