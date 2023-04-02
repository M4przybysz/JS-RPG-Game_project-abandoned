const Player = {
    name : null,
    class : null,
    
    direction : 'S', // W - north, D - east, S - south, A - west 

    // player level values
    lvl : 1,
    exp : 0,
    exp_to_next_lvl : 100,

    // Basic statistics
    max_hp : 100,
    max_mana : 100,

    hp : 100,
    mana : 100,
    defense : 0,
    attack_power : 0,

    // Player location and position
    location : Start_save.Player.location,
    position_x : Start_save.Player.position_x,
    position_y : Start_save.Player.position_y,

    // Plaer inventory
    equiped_item : null,
    equiped_healing : null,

    head_armor : null,
    torso_armor : null,
    legs_armor : null,

    backpack : [],

    pickUpItem(item_id) {
        let backpack_max_capacity = 18
        let item_containers = document.getElementsByClassName('item_container')

        if(this.backpack.length < backpack_max_capacity) {
            this.backpack.push(item_id)

            for(let i = 0; i < this.backpack.length; i++) {
                item_containers[i].innerHTML = `<img src="${Texture_dict[Active_save.Item_list[this.backpack[i]].texture]}">`
            }
        }
        else {
            console.log(`backpack max capacity (${backpack_max_capacity}) reached. Can't pick up more items`)
        }
    },

    equipItem(eq_place, item_id) {
        let item = Active_save.Item_list[item_id]

        // check if item can be placed
        if(eq_place == 'head_armor' && (item.constructor.name != 'Armor' || item.armor_place != 'head')) return
        if(eq_place == 'torso_armor' && (item.constructor.name != 'Armor' || item.armor_place != 'torso')) return
        if(eq_place == 'legs_armor' && (item.constructor.name != 'Armor' || item.armor_place != 'legs')) return
        if(eq_place == 'equiped_healing' && (item.constructor.name != 'Healing' || item.constructor.name != 'Food')) return

        let item_containers = document.getElementsByClassName('item_container')

        // place item
        this[eq_place] = item_id
        document.getElementById(eq_place).innerHTML = `<img src="${Texture_dict[item.texture]}">`

        // update player stats
        Player.defense = 0 + Active_save.Item_list[this.head_armor] ? Active_save.Item_list[this.head_armor].def_value : 0 
            + Active_save.Item_list[this.torso_armor] ? Active_save.Item_list[this.torso_armor].def_value : 0
            + Active_save.Item_list[this.legs_armor] ? Active_save.Item_list[this.legs_armor].def_value : 0

        Player.attack_power = 0 + Active_save.Item_list[this.equiped_item] ? Active_save.Item_list[this.equiped_item].attack_value ?? 0 : 0

        // refresh backpack
        this.backpack.splice(this.backpack.indexOf(item_id), 1)
        for(let i = 0; i < item_containers.length; i++) {
            item_containers[i].innerHTML = ''
        }
        for(let i = 0; i < this.backpack.length; i++) {
            item_containers[i].innerHTML = `<img src="${Texture_dict[Active_save.Item_list[this.backpack[i]].texture]}">`
        }
    }
}