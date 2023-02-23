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
        Items : null,
        Creatures : null,
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
    background

    breakMap(location) {
        let multinode_regex = new RegExp(/^[x]\d+\/[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)?$/)
        let x_multiplier = 0
        let id = ''

        let bg_rows = []
        location["Background"].map((row, y) => {
            bg_rows.push(0)
            row.map((node) => {
                if(multinode_regex.test(node)) bg_rows[y] += parseInt(node.split('/')[0].replace('x', ''))
                else bg_rows[y] += 1
            })
        })



        // for(let y = 0; y < bg_rows.length; y++) {
        //     for(let x = 0; x < bg_rows[y]; x++) {
        //         this.nodes[y].push(new MapNode(x, y))
        //     }
        // }

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