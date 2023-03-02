tab_counter = 0
new_tab_number = 0
max_tab_count = 7

let EditedMap = new ActiveMap('EMPTY', DefaultMaps.Empty2)

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

        console.log(AMap)

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
    let msg = 'Are you sure you want to delete this row?\nYou CAN NOT UNDO this action!!!'

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
    else { return }
}

function removeColumn(remove_x) {
    let msg = 'Are you sure you want to delete this column?\nYou CAN NOT UNDO this action!!!'

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
    else { return }
}

function DrawTestureOrCollision() {


    checkCheckbox()
}

function AddIOC() {


    checkCheckbox()
}

function mapToString (obj) {
    var str = '';

    return str;
}

function exportMap() {
    console.log(EditedMap)
}

function importMap() {
    let msg = 'Are you sure you want to import new map?\nCurrent edited map will be overwriten!\nYou CAN NOT UNDO this action!!!'

    if(confirm(msg)) {
        let from_deafults = document.getElementById('import_map_from_defaults')

        if(from_deafults.value != 'none') {
            MapContainer.nodes = []
            document.getElementById('map_view').innerHTML = ''

            EditedMap = new ActiveMap(DefaultMaps[from_deafults.value].name, DefaultMaps[from_deafults.value])

            MapContainer.showMap(EditedMap)
            checkCheckbox()
        }
    }
    else { return }

    document.getElementById('import_map_div').style.display = 'none'
}