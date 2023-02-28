const DefaultMaps = {
    Empty : {
        name : "Empty map",

        background : [
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
        ],
        walls : [
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'],
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'],
        ],
        collision : [
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
        ],
        objects : null,
        items : null,
        creatures : null,
    },

    Empty2 : {
        name : "Empty map",

        background : [
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'],
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'], 
            ['x10/f'],
        ],
        walls : [
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/w'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'],
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'], 
            ['x10/n'],
        ],
        collision : [
            ['x10/r'], 
            ['x10/l'], 
            ['x10/u'], 
            ['x10/d'], 
            ['x10/udlr'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'], 
            ['x10/.'],
        ],
        objects : null,
        items : null,
        creatures : null,
    }
}

class ActiveMap {
    name = ""

    background = []
    walls = []
    collision = []
    objects = []
    items = []
    creatures = []

    bg_rows = []
    breakMap(location) {
        let multinode_regex = new RegExp(/^[x]\d+\/[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)?$/)
        let x_multiplier = 0
        let id = ''

        this.bg_rows = []
        location["background"].map((row, y) => {
            this.bg_rows.push(0)
            this.background.push([])
            row.map((node, x) => {
                if(multinode_regex.test(node)) {
                    this.bg_rows[y] += parseInt(node.split('/')[0].replace('x', ''))
                    
                    x_multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]
                    for(let i = 0; i < x_multiplier; i++) { this.background[y].push(id) }
                }
                else {
                    this.bg_rows[y] += 1 

                    this.background[y].push(location['background'][y][x].replace(/ /g, ''))
                }
            })
        })

        x_multiplier = 0
        id = ''
        location["walls"].map((row, y) => {
            this.walls.push([])
            row.map((node, x) => {
                if(multinode_regex.test(node)) {
                    x_multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]
                    for(let i = 0; i < x_multiplier; i++) { this.walls[y].push(id) }
                }
                else {
                    this.walls[y].push(location['walls'][y][x].replace(/ /g, ''))
                }
            })
        })

        x_multiplier = 0
        id = ''
        location["collision"].map((row, y) => {
            this.collision.push([])
            row.map((node, x) => {
                if(multinode_regex.test(node)) {
                    x_multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]
                    for(let i = 0; i < x_multiplier; i++) { this.collision[y].push(id) }
                }
                else {
                    this.collision[y].push(location['collision'][y][x].replace(/ /g, ''))
                }
            })
        })

    }

    constructor(name, location) {
        this.name = name

        this.objects = location.objects
        this.items = location.items
        this.creatures = location.items

        this.breakMap(location)
    }

    addRow() {
        MapContainer.nodes = []
        document.getElementById('map_view').innerHTML = ''
        
        this.bg_rows.push(this.bg_rows[0])
        this.background.push([])
        for(let i = 0; i < this.bg_rows[0]; i++) { this.background[this.bg_rows.length-1].push('.') }

        this.walls.push([])
        for(let i = 0; i < this.bg_rows[0]; i++) { this.walls[this.bg_rows.length-1].push('n') }

        this.collision.push([])
        for(let i = 0; i < this.bg_rows[0]; i++) { this.collision[this.bg_rows.length-1].push('.') }

        MapContainer.showMap(EditedMap)
        
        showGridLines(document.getElementById('grid_lines_checkbox'))
        showWalls(document.getElementById('show_walls_checkbox'))
        showCollision(document.getElementById('show_collision_checkbox'))
        showObjectsAndItems(document.getElementById('show_objects_and_items_checkbox'))
        showCreatures(document.getElementById('show_creatures_checkbox'))
    }

    addColumn() {
        MapContainer.nodes = []
        document.getElementById('map_view').innerHTML = ''

        this.bg_rows.map((row, y) => { this.bg_rows[y] += 1 })

        this.background.map((row, y) => { this.background[y].push('.') })
        this.walls.map((row, y) => { this.walls[y].push('n') })
        this.collision.map((row, y) => { this.collision[y].push('.') })

        MapContainer.showMap(EditedMap)

        showGridLines(document.getElementById('grid_lines_checkbox'))
        showWalls(document.getElementById('show_walls_checkbox'))
        showCollision(document.getElementById('show_collision_checkbox'))
        showObjectsAndItems(document.getElementById('show_objects_and_items_checkbox'))
        showCreatures(document.getElementById('show_creatures_checkbox'))
    }
    
    deleteRow(checkbox) {
        let drawT = document.getElementById('draw_textures_checkbox')
        let addIOC = document.getElementById('add_ioc_checkbox')

        let delete_column = document.getElementById('delete_column_checkbox')

        if(checkbox.checked) {
            drawT.checked = false
            addIOC.checked = false
            delete_column.checked = false

            MapContainer.nodes.map((row, y) => {
                row.map(node => {
                    node.div.setAttribute('onclick', `removeRow(${y})`)
                })
            })
        }
        else if(!checkbox.checked) {
            MapContainer.nodes.map(row => {
                row.map((node, x) => {
                    node.div.setAttribute('onclick', '')
                })
            })
        }
        else { return }
    }

    deleteColumn(checkbox) {
        let drawT = document.getElementById('draw_textures_checkbox')
        let addIOC = document.getElementById('add_ioc_checkbox')

        let delete_row = document.getElementById('delete_row_checkbox')

        if(checkbox.checked) {
            drawT.checked = false
            addIOC.checked = false
            delete_row.checked = false

            MapContainer.nodes.map(row => {
                row.map((node, x) => {
                    node.div.setAttribute('onclick', `removeColumn(${x})`)
                })
            })
        }
        else if(!checkbox.checked) {
            MapContainer.nodes.map(row => {
                row.map((node, x) => {
                    node.div.setAttribute('onclick', '')
                })
            })
        }
        else { return }
    }
}