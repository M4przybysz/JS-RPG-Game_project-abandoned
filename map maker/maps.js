const DefaultMaps = {
    Empty : {
        Name : "Empty map",

        Background : [
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'],
        ],
        Walls : [
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'], 
            ['x10/null'],
        ],
        Collision : [
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
        Items : null,
        Creatures : null,
    },
}

class MapNode {
    constructor(node_x, node_y, bg_id, w_id, coll_id, item, creature) {
        this.x = node_x
        this.y = node_y

        this.Background = IDs.Textures[bg_id]
        this.Wall = IDs.Textures[w_id]
        this.Collision = IDs.Collision[coll_id]

        this.Item = item
        this.Creature = creature
    }
}

class ActiveMap {
    name = ""

    nodes = []

    breakMap(location) {
        let multinode_regex = new RegExp(/^[x]\d+\/[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)?$/)
        let x_multiplier = 0
        let id = ''

        let bg_rows = []
        location["Background"].map((row, y) => {
            bg_rows.push(0)
            this.nodes.push([])
            row.map((node) => {
                if(multinode_regex.test(node)) bg_rows[y] += parseInt(node.split('/')[0].replace('x', ''))
                else bg_rows[y] += 1
            })
        })

        let background = []
        location["Background"].map((row, y) => {
            background.push([])
            row.map((node) => {
                if(multinode_regex.test(node)) {
                    x_multiplier = parseInt(node.split('/')[0].replace('x', '')) // Extract multiplier from notation
                    id = node.split('/')[1] // Extract texture id from notation

                    for(let i = 0; i < x_multiplier; i++) { background[y].push(id) }
                }
                else background[y].push(location["Background"][y][x].replace(/ /g, ''))
            })
        })
        console.log(background)

        let walls = []
        location["Walls"].map((row, y) => {
            walls.push([])
            row.map((node) => {
                if(multinode_regex.test(node)) {
                    x_multiplier = parseInt(node.split('/')[0].replace('x', '')) // Extract multiplier from notation
                    id = node.split('/')[1] // Extract texture id from notation

                    for(let i = 0; i < x_multiplier; i++) { walls[y].push(id) }
                }
                else walls[y].push(location["Walls"][y][x].replace(/ /g, ''))
            })
        })
        console.log(walls)

        for(let y = 0; y < bg_rows.length; y++) {
            for(let x = 0; x < bg_rows[y]; x++) {
                this.nodes[y].push(new MapNode(x, y))
            }
        }

        console.log(this.nodes)
    }

    constructor(name, Location) {
        this.name = name

        this.breakMap(Location)
    }

    showMap() {

    }

    addColumn() {

    }

    addRow() {

    }
}