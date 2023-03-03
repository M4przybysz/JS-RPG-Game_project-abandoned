tab_counter = 0
new_tab_number = 0
max_tab_count = 7

let EditedMap = new ActiveMap('EMPTY', DefaultMaps.Empty)

class Node {
    div = document.createElement('div')

    object = null
    item = null
    creature = null

    constructor(node_x, node_y, bg_id, w_id, coll_id) {
        this.x = node_x
        this.y = node_y

        this.bg_id = bg_id
        this.w_id = w_id
        this.coll_id = (RegExp(/^[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)$/).test(coll_id)) ? coll_id.split('-')[0] : coll_id
        
        this.background = IDs.textures[this.bg_id]
        this.wall = IDs.textures[this.w_id]
        this.collision = (this.coll_id == 'a') ? 'all' : ((this.coll_id == '.') ? 'none' : this.coll_id)
        
        this.div.setAttribute('class', 'node node_border')
        this.div.style.backgroundImage = `url(${this.background})`

        this.div.innerHTML = `  <img src="${this.wall}" alt="wall_texture" class="wall">
                                <div class="collision">
                                    ${(RegExp(/^[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)$/).test(coll_id)) ? coll_id : this.collision}
                                </div>`

        this.innerHTML += (this.object == null) ? '' : '<img src="${this.object.texture}" alt="object_texture" class="object">'
        this.innerHTML += (this.item == null) ? '' : '<img src="${this.item.texture}" alt="item_texture" class="item">'
        this.innerHTML += (this.creature == null) ? '' : '<img src="${this.creature.texture}" alt="creature_texture" class="creature">'
    }
}

const MapContainer = {
    nodes : [],

    showMap : function(AMap) {
        document.querySelectorAll('node').forEach(n => {
            n.parentNode.remove()
        })

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
    },
}

window.onload = () => {
    document.getElementById('import_map_div').style.display = 'none'
    document.getElementById('export_map_div').style.display = 'none'

    let texture_select = document.getElementById('select_texture')
    for(let i = 0; i < Object.entries(IDs.textures).length; i++) {
        texture_select.innerHTML += `<option value="${Object.keys(IDs.textures)[i]}">${Object.entries(IDs.textures)[i].toString().split('/')[3].split('.')[0]}</option>`
    }

    let import_map_select = document.getElementById('import_map_from_defaults')
    for(let i = 0; i < Object.keys(DefaultMaps).length; i++) {
        import_map_select.innerHTML += `<option vlaue="${Object.keys(DefaultMaps)[i]}">${Object.keys(DefaultMaps)[i]}</option>`
    }

    let map_name = document.getElementById('map_name')
    map_name.value = EditedMap.name
    map_name.oninput = () => {
        EditedMap.name = map_name.value
        console.log(EditedMap.name)
    }

    MapContainer.showMap(EditedMap)
}

function checkCheckbox() {
    showGridLines(document.getElementById('grid_lines_checkbox'))
    showWalls(document.getElementById('show_walls_checkbox'))
    showCollision(document.getElementById('show_collision_checkbox'))
    showObjectsAndItems(document.getElementById('show_objects_and_items_checkbox'))
    showCreatures(document.getElementById('show_creatures_checkbox'))
}

function showGridLines(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.classList.add('node_border')
            })
        })
    }
    else {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.classList.remove('node_border')
            })
        })
    }
}

function showWalls(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.querySelector('.wall').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.querySelector('.wall').style.display = 'none'
            })
        })
    }
}

function showCollision(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.querySelector('.collision').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.querySelector('.collision').style.display = 'none'
            })
        })
    }
}

function showObjectsAndItems(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                if(node.object != null) node.div.querySelector('.object').style.display = 'block'
                if(node.item != null) node.div.querySelector('.item').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map(row => {
            row.map(node => {
                if(node.object != null) node.div.querySelector('.object').style.display = 'none'
                if(node.item != null) node.div.querySelector('.item').style.display = 'none'
            })
        })
    }
}

function showCreatures(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                if(node.creature != null) node.div.querySelector('.creature').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map(row => {
            row.map(node => {
                if(node.creature != null) node.div.querySelector('.creature').style.display = 'none'
            })
        })
    }
}

function selectLayer(select) {
    if(select.value == 'collision') {
        document.getElementById('select_collision_label').style.display = 'block'
        document.getElementById('select_texture_label').style.display = 'none'
    }
    else {
        document.getElementById('select_collision_label').style.display = 'none'
        document.getElementById('select_texture_label').style.display = 'block'
    }
}

function selectCollision(select) {
    if(select.value == 's') {
        document.getElementById('switch_location_collision_label').style.display = 'block'
        document.getElementById('tools_br').style.display = 'none'
    }
    else {
        document.getElementById('switch_location_collision_label').style.display = 'none'
        document.getElementById('tools_br').style.display = 'block'
    }
}

function removeRow(remove_y) {
    let msg = 'Are you sure you want to delete this row?\n\nYou CAN NOT UNDO this action!!!'

    if(confirm(msg)) {
        MapContainer.nodes = []
        document.getElementById('map_view').innerHTML = ''

        EditedMap.bg_rows.splice(remove_y, 1)

        EditedMap.background.splice(remove_y, 1)
        EditedMap.walls.splice(remove_y, 1)
        EditedMap.collision.splice(remove_y, 1)

        MapContainer.showMap(EditedMap)
        EditedMap.deleteRow(document.getElementById('delete_row_checkbox'))

        checkCheckbox()
    }
}

function removeColumn(remove_x) {
    let msg = 'Are you sure you want to delete this column?\n\nYou CAN NOT UNDO this action!!!'

    if(confirm(msg)) {
        MapContainer.nodes = []
        document.getElementById('map_view').innerHTML = ''
    
        EditedMap.bg_rows.map((row, y) => { EditedMap.bg_rows[y] -= 1 })
    
        EditedMap.background.map(row => { row.splice(remove_x, 1) })
        EditedMap.walls.map(row => { row.splice(remove_x, 1) })
        EditedMap.collision.map(row => { row.splice(remove_x, 1) })
    
        MapContainer.showMap(EditedMap)
        EditedMap.deleteColumn(document.getElementById('delete_column_checkbox'))

        checkCheckbox()
    }
}

function drawTestureOrCollision(checkbox) {
    let addIOC = document.getElementById('add_ioc_checkbox')
    let del_r = document.getElementById('delete_row_checkbox')
    let del_c = document.getElementById('delete_column_checkbox')

    if(checkbox.checked) {
        addIOC.checked = false
        del_r.checked = false
        del_c.checked = false 

        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.setAttribute('onclick', `editTextureOrCollision(${x}, ${y})`)
            })
        })
    }
    else if(!checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.setAttribute('onclick', '')
            })
        })
    }
}

function editTextureOrCollision(x, y) {
    let layer_select = document.getElementById('select_layer')
    layer = layer_select.value

    MapContainer.nodes = []
    document.getElementById('map_view').innerHTML = ''

    if(layer == 'background' || layer == 'walls') {
        let texture_select = document.getElementById('select_texture')

        EditedMap[layer][y][x] = texture_select.value
    }
    else if(layer == 'collision') {
        let collision_select = document.getElementById('select_collision')

        if(collision_select.value == 's') {
            let ls_x = document.getElementById('sl_map_x').value
            let ls_y = document.getElementById('sl_map_y').value
            let ls_map_name = document.getElementById('sl_map_name').value

            EditedMap[layer][y][x] = `.-s:${ls_x}:${ls_y}:${ls_map_name}`
        }
        else {
            EditedMap[layer][y][x] = collision_select.value
        }
    }

    MapContainer.showMap(EditedMap)
    EditedMap.deleteColumn(document.getElementById('delete_column_checkbox'))

    checkCheckbox()
    drawTestureOrCollision(document.getElementById('draw_textures_checkbox'))
}

function addIOC(checkbox) {
    let draw_textures = document.getElementById('draw_textures_checkbox')
    let del_r = document.getElementById('delete_row_checkbox')
    let del_c = document.getElementById('delete_column_checkbox')

    if(checkbox.checked) {
        draw_textures.checked = false
        del_r.checked = false
        del_c.checked = false 


    }
    else if(!checkbox.checked) {
        MapContainer.nodes.map(row => {
            row.map(node => {
                node.div.setAttribute('onclick', '')
            })
        })
    }

    checkCheckbox()
}

function mapToString(map_object) {
    let map_str = ''

    map_str = `${map_object.name} : {<br>&emsp;name : '${map_object.name}',<br>&emsp;background_map : [<br>&emsp;&emsp;`
    map_object.background.map(row => {
        map_str += '['
        row.map(node => { map_str += `'${node}',` })
        map_str += '],<br>&emsp;&emsp;'
    })

    map_str += `],<br>&emsp;walls_map : [<br>&emsp;&emsp;`
    map_object.walls.map(row => {
        map_str += '['
        row.map(node => { map_str += `'${node}',` })
        map_str += '],<br>&emsp;&emsp;'
    })

    map_str += `],<br>&emsp;collision_map : [<br>&emsp;&emsp;`
    map_object.collision.map(row => {
        map_str += '['
        row.map(node => { map_str += `'${node}',` })
        map_str += '],<br>&emsp;&emsp;'
    })

    map_str += `], <br>&emsp;objects : `
    if(map_object.objects == null) map_str += 'null,<br>&emsp;'
    else {
        map_str += '[],<br>&emsp;&emsp;'
    }

    map_str += `items : `
    if(map_object.items == null) map_str += 'null,<br>&emsp;'
    else {
        map_str += '[],<br>&emsp;'
    }

    map_str += `creatures : `
    if(map_object.creatures == null) map_str += 'null,<br>&emsp;'
    else {
        map_str += '[],<br>&emsp;'
    }

    map_str += '},'

    return map_str
}

function exportMap() {
    document.getElementById('export_map_span').innerHTML = mapToString(EditedMap)
}

function importMap() {
    let msg = 'Are you sure you want to import new map?<br>Current edited map will be overwriten!<br><br>YOU CAN NOT UNDO THIS ACTION!!!'

    let addIOC = document.getElementById('add_ioc_checkbox')
    let del_r = document.getElementById('delete_row_checkbox')
    let del_c = document.getElementById('delete_column_checkbox')
    let draw_textures = document.getElementById('draw_textures_checkbox')

    if(confirm(msg)) {
        let from_deafults = document.getElementById('import_map_from_defaults')

        if(from_deafults.value != 'none') {
            MapContainer.nodes = []
            document.getElementById('map_view').innerHTML = ''

            EditedMap = new ActiveMap(DefaultMaps[from_deafults.value].name, DefaultMaps[from_deafults.value])

            MapContainer.showMap(EditedMap)
            checkCheckbox()
            
            addIOC.checked = false
            del_c.checked = false
            del_r.checked = false
            draw_textures.checked = false
        }
    }

    document.getElementById('import_map_div').style.display = 'none'
}