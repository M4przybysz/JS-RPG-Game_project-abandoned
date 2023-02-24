tab_counter = 0
new_tab_number = 0
max_tab_count = 7

active_maps = []

class Node {
    div = document.createElement('div')

    constructor(node_x, node_y, bg_id, w_id, coll_id) {
        this.x = node_x
        this.y = node_y
        
        this.background = IDs.textures[bg_id]
        this.wall = IDs.textures[w_id]
        this.collision = IDs.collision[coll_id]
        
        this.div.setAttribute('id', `node_x${node_x}_y${node_y}`)
        this.div.setAttribute('class', 'node node_border')
        this.div.style.backgroundImage = `url(${this.background})`

        this.div.innerHTML = `  <div class="collision ${(this.collision == 'none') ? "" : 
                                                        (this.collision == 'all') ? 'collision-r collision-l collision-u collision-d' : 
                                                        (this.collision == 'up') ? 'collision-u' : 
                                                        (this.collision == 'down') ? 'collision-d' :
                                                        (this.collision == 'right') ? 'collision-r' : 'collision-l'}">
                                    ${this.collision}
                                </div>`
    }

    object = null
    item = null
    creature = null
}

const MapContainer = {
    nodes : [],

    showMap : function(AMap) {
        this.nodes = []

        let root = document.documentElement
        root.style.setProperty('--grid_rows', AMap.bg_rows.length)
        root.style.setProperty('--grid_columns', AMap.bg_rows[0])

        AMap.bg_rows.map((row, y) => {
            this.nodes.push([])
            for(let x = 0; x < AMap.bg_rows[y]; x++) {
                this.nodes[y].push(new Node(x, y, AMap.background[y][x], AMap.walls[y][x], AMap.collision[y][x]))

                document.getElementById('map_view').appendChild(this.nodes[y][x].div)
            }
        })
        console.log(this.nodes)
    },
}

window.onload = () => {
    let map_container = document.getElementById('map_container')

    addTab()
    MapContainer.showMap(active_maps[0])
}

function showGridLines(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.classList.add('node_border')
            })
        })
    }
    else {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.classList.remove('node_border')
            })
        })
    }
}

function showCollision(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.querySelector('.collision').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.querySelector('.collision').style.display = 'none'
            })
        })
    }
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

        active_maps.push(new ActiveMap(`Empty map ${new_tab_number}`, DefaultMaps.Empty2))
        console.log(active_maps)

        tab_counter += 1
        new_tab_number += 1
    }
}