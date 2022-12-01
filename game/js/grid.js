class Node {
    constructor(position_x, position_y, item=null, creature=null) {
        this.div = document.createElement('div')

        this.position_x = position_x
        this.position_y = position_y

        this.div.textContent = `${position_x} : ${position_y}`
        this.div.classList.add('node')

        this.item = item
        this.creature = creature
    }

    addCollision(id) {
        if(id == 'a') this.collision = 'udlr'
        else this.collision = id
    }

}

const Grid = {
    grid_width : 19,
    grid_height : 10,
    player_node_x : 9, // position x of player_node in grid
    player_node_y : 5, // position y of player_node in grid

    // layered maps of the game
    nodes : [],
    background_map : [],
    walls_map : [],
    collision_map : [],
    items_map : null,
    creatures_map : null,

    texture_dict : { // dictionary containing texture corresponding to its id
        'n' : './assets/null.png',
        '.' : './assets/void.png',
        'f' : './assets/test_textures/floor.png',
        'w' : './assets/test_textures/wall.png',
    },

    container : document.getElementById('game_grid_container'),
    grid : document.getElementById('game_grid'),

    importLayer : function(location, layer) {
        let multiplication_regex = new RegExp(/[x]\d+\/[a-zA-Z\.]{1,3}/)
        let multiplier = 0
        let id = ''

        location[layer].map((row, y) => {
            this[layer].push([])
            row.map((node, x) => {
                if(multiplication_regex.test(node)) { // Check for multinode notation 
                    multiplier = parseInt(node.split('/')[0].replace('x', '')) // Extract multiplier from notation
                    id = node.split('/')[1] // Extract texture id from notation

                    for(let i = 0; i < multiplier; i++) { this[layer][y].push(id) } // Push multiple ids
                }
                else this[layer][y].push(location[layer][y][x]) // Push single id
            })
        })
    },

    importLocation : function(location_name) {
        let location = Start_save.Locations[location_name]
        
        this.importLayer(location, 'background_map')
        console.log(this.background_map)

        this.importLayer(location, 'walls_map')
        console.log(this.walls_map)

        this.importLayer(location, 'collision_map')
        console.log(this.collision_map)
    },

    nodeInLayer : function(x, y, layer) {
        if(x < 0 || y < 0 || y > this[layer].length-1 || x > this[layer][y].length-1) return false
        return true
    },

    loadGrid : function() {
        this.grid.innerHTML = ""

        // Create nodes
        for(let y = 0, py = Player.position_y-this.player_node_y; y < this.grid_height; y++, py++) {
            this.nodes.push([])
            for(let x = 0, px = Player.position_x-this.player_node_x; x < this.grid_width; x++, px++) {
                this.nodes[y].push(new Node(px, py))

                // Create background
                if(this.nodeInLayer(px, py, 'background_map')) this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict[this.background_map[py][px]]})`
                else this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict['.']})`

                // Create "walls"
                if(this.nodeInLayer(px, py, 'walls_map')) this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict[this.walls_map[py][px]]}">`
                else this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict['n']}">`

                // Apply collision
                if(this.nodeInLayer(px, py, 'collision_map')) this.nodes[y][x].addCollision(this.collision_map[py][px])
                else this.nodes[y][x].addCollision('.')

                // Create player node
                if(y == this.player_node_y && x == this.player_node_x) {
                    this.nodes[y][x].div.id = 'player_node'
                    this.nodes[y][x].div.innerHTML = '<img src="./assets/test_textures/arrow_down.png" alt="Sorry. There is no arrow."></img>'
                }
            }
        }

        // Load nodes to html
        this.nodes.map(row => {
            row.map(node => this.grid.appendChild(node.div))
        })

        console.log(this.nodes)

        return 1
    },

    moveGrid : function(key) {
        if(key === null) return -1

        const XY = { // Return [x, y] valuses used to change all nodes positions
            'W' : [0, -1],
            'S' : [0, 1],
            'A' : [-1, 0],
            'D' : [1, 0],
        }

        if( (key == 'W' && this.nodes[this.player_node_y-1][this.player_node_x].collision.includes('d')) ||
            (key == 'S' && this.nodes[this.player_node_y+1][this.player_node_x].collision.includes('u')) ||
            (key == 'A' && this.nodes[this.player_node_y][this.player_node_x-1].collision.includes('r')) ||
            (key == 'D' && this.nodes[this.player_node_y][this.player_node_x+1].collision.includes('l'))) 
        {
            console.log('path is blocked')
        }
        else {
            // Udate position of nodes in grid
            this.nodes.map((row, y) => {
                row.map((node, x) => {

                    node.position_x += XY[key][0]
                    node.position_y += XY[key][1]
                    //node.div.textContent = `${node.position_x} : ${node.position_y}`

                    // Draw background
                    if(this.nodeInLayer(node.position_x, node.position_y, 'background_map')) this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict[this.background_map[node.position_y][node.position_x]]})`
                    else this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict['.']})`

                    // Draw 'walls'
                    if(this.nodeInLayer(node.position_x, node.position_y, 'walls_map')) this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict[this.walls_map[node.position_y][node.position_x]]}">`
                    else this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict['n']}">`

                    // Apply collision
                    if(this.nodeInLayer(node.position_x, node.position_y, 'collision_map')) this.nodes[y][x].addCollision(this.collision_map[node.position_y][node.position_x])
                    else this.nodes[y][x].addCollision('.')
                })
            })

            Player.position_x += XY[key][0]
            Player.position_y += XY[key][1]
        }

        //TODO: Change this to real player assets when they are done
        // Set player node image
        document.getElementById('player_node').innerHTML = `<img src="assets/test_textures/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">`

        active_wsad_key = null // Clear last pressed key

        return 1
    }
}