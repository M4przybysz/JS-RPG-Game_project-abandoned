const Player = {
    name : null,
    class : null,
    
    direction : 'S', // W - north, D - east, S - south, A - west 

    // Basic statistics
    lvl : 1,
    exp : 0,
    exp_to_next_lvl : 100,
    hp : 100,
    max_hp : 100,
    mana : 100,
    max_mana : 100,

    // Player location and position
    location : Start_save.Player.location,
    position_x : Start_save.Player.position_x,
    position_y : Start_save.Player.position_y,

    // Plaer inventory
    equiped_item : null,

    head_armor : null,
    torso_armor : null,
    legs_armor : null,

    backpack : [],

    pickUpItem : function(item_id) {
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
    }
}