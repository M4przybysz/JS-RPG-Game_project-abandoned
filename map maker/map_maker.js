tab_counter = 0
new_tab_number = 0
max_tab_count = 10

active_maps = []
nodes = []

class Node {
    constructor(node_x, node_y, bg_id, w_id, coll_id, item, creature) {
        this.x = node_x
        this.y = node_y

        this.background = IDs.textures[bg_id]
        this.wall = IDs.textures[w_id]
        this.collision = IDs.collision[coll_id]

        this.item = item
        this.creature = creature
    }
}

window.onload = () => {
    let map_container = document.getElementById('map_container')

    addTab()
}

function deleteTab(element) {
    let parent_name = element.parentElement.getElementsByClassName('tab_textContent')[0].textContent.trim()
    let confirm_msg = `Do you want to delete "${parent_name}"? \nAll unsaved progres will be LOST!!!`
    if(confirm(confirm_msg)) {

        for(let removal_index = 0; removal_index < active_maps.length; removal_index++) {
            if(active_maps[removal_index].name == parent_name) {
                active_maps.splice(parseInt(removal_index), 1)
                break
            }
        }
        console.log(active_maps)

        element.parentElement.remove()

        tab_counter -= 1
    }
    else {
        return 0
    }
}

function addTab() {
    if(tab_counter < max_tab_count) {
        let container = document.getElementById('map_tabs')
    
        let new_tab = document.createElement('div')
        new_tab.setAttribute('class', 'tab')
        new_tab.setAttribute('id', `tab${new_tab_number}`)
        new_tab.innerHTML = `   <div class="tab_textContent">Empty map ${new_tab_number}</div>
                                <img src="./textures/UI/delete_tab.png" alt="delete tab" class="delete_tab" onclick="deleteTab(this)">`
    
        container.appendChild(new_tab)

        active_maps.push(new ActiveMap(`Empty map ${new_tab_number}`, DefaultMaps.Empty))
        console.log(active_maps)

        tab_counter += 1
        new_tab_number += 1
    }
}