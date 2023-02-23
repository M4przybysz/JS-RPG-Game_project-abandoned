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
        ],
        objects : null,
        items : null,
        creatures : null,
    },
}

// class MapNode {
//     constructor(node_x, node_y, bg_id, w_id, coll_id, item, creature) {
//         this.x = node_x
//         this.y = node_y

//         this.background = IDs.textures[bg_id]
//         this.wall = IDs.textures[w_id]
//         this.collision = IDs.collision[coll_id]

//         this.item = item
//         this.creature = creature
//     }
// }

class ActiveMap {
    name = ""
    background = []
    walls = []
    collision = []
    objects = []
    items = []
    creatures = []

    breakMap(location) {
        let multinode_regex = new RegExp(/^[x]\d+\/[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)?$/)
        let x_multiplier = 0
        let id = ''

        let bg_rows = []
        location["background"].map((row, y) => {
            bg_rows.push(0)
            this.background.push([])
            row.map((node, x) => {
                if(multinode_regex.test(node)) {
                    bg_rows[y] += parseInt(node.split('/')[0].replace('x', ''))
                    
                    x_multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]
                    for(let i = 0; i < x_multiplier; i++) { this.background[y].push(id) }
                }
                else {
                    bg_rows[y] += 1 

                    this.background[y].push(location['background'][y][x].replace(/ /g, ''))
                }
            })
        })
        console.log(this.background)

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
        console.log(this.walls)

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
        console.log(this.collision)

        // for(let y = 0; y < bg_rows.length; y++) {
        //     for(let x = 0; x < bg_rows[y]; x++) {
        //         this.nodes[y].push(new MapNode(x, y))
        //     }
        // }
    }

    constructor(name, location) {
        this.name = name

        this.objects = location.objects
        this.items = location.items
        this.creatures = location.items

        this.breakMap(location)
    }

    showMap() {

    }

    addColumn() {

    }

    addRow() {

    }
}