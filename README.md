# mhgu-weapon-transmog-tool WIP!
A tauri/vue3 GUI to transmog weapons for monster hunter generation ultimate for the Yuzu/Ryujinx version.
![image](https://github.com/FeckNeck/mhgu-weapon-transmog-tool/assets/41020659/f3c33951-b567-42da-b556-3d7040d4475e)

## Warning
Currently, only greatswords can be transmogged! 
If you're interested in the mod, you can contribute by filling in the JSON file for other weapon types (https://github.com/FeckNeck/mhgu-weapon-transmog-tool/blob/master/src/assets/weapons.json).

## About
There are currently 2 ways to transmogrify weapons in mhxx: by modifying the resident.arc file or by directly modifying the weapons in the arc folder. The best would have been to be able to modify the resident.arc file, but there's currently no tool for extracting files from the archive and then compressing it again. Maybe in the future, if Kuriimu2's cli allows you to use the mt_framework plugin and thus extract the archive, I'll modify this project to use it.
Anyway, there's currently no database for mhxx that contains the weapon ID to get the image from kiranico. The only solution I found was to create the json file by hand. 

