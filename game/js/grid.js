class Node {
    constructor(position_x, position_y, collision = '.', item=null, creature=null) {
        this.div = document.createElement('div')

        this.position_x = position_x
        this.position_y = position_y

        this.div.textContent = `${position_x} : ${position_y}`
        this.div.classList.add('node')

        this.item = item
        this.creature = creature

        this.collision = '.'
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

    player_x : Start_save.Player.position_x, // player starting position x
    player_y : Start_save.Player.position_y, // player starting position y

    container : document.getElementById('game_grid_container'),
    grid : document.getElementById('game_grid'),

    importLocation : function(location_name) {
        let location = Start_save.Locations[location_name]

        let multiplication_regex = new RegExp(/[x]\d+\/[a-zA-Z\.]{1,3}/)
        let multiplier = 0
        let id = ''
        
        location.background_map.map((row, y) => { // 
            this.background_map.push([])

            row.map((node, x) => {
                if(multiplication_regex.test(node)) {
                    multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]

                    for(let i = 0; i < multiplier; i++) { this.background_map[y].push(id) }
                }
                else this.background_map[y].push(location.background_map[y][x])
            })
        })
        console.log(this.background_map)

        location.walls_map.map((row, y) => {
            this.walls_map.push([])

            row.map((node, x) => {
                if(multiplication_regex.test(node)) {
                    multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]

                    for(let i = 0; i < multiplier; i++) { this.walls_map[y].push(id) }
                }
                else this.walls_map[y].push(location.walls_map[y][x])
            })
        })
        console.log(this.walls_map)

        location.collision_map.map((row, y) => {
            this.collision_map.push([])

            row.map((node, x) => {
                if(multiplication_regex.test(node)) {
                    multiplier = parseInt(node.split('/')[0].replace('x', ''))
                    id = node.split('/')[1]

                    for(let i = 0; i < multiplier; i++) { this.collision_map[y].push(id) }
                }
                else this.collision_map[y].push(location.collision_map[y][x])
            })
        })
        console.log(this.collision_map)
    },

    loadGrid : function() {
        this.grid.innerHTML = ""

        // Create nodes
        for(let y = 0, py = this.player_y-this.player_node_y; y < this.grid_height; y++, py++) {
            this.nodes.push([])
            for(let x = 0, px = this.player_x-this.player_node_x; x < this.grid_width; x++, px++) {
                this.nodes[y].push(new Node(px, py))

                // Import background
                if(px < 0 || py < 0 || py > this.background_map.length-1 || px > this.background_map[py].length-1) this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict['.']})`
                else this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict[this.background_map[py][px]]})`

                // Import "walls"
                if(px < 0 || py < 0 || py > this.walls_map.length-1 || px > this.walls_map[py].length-1) this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict['n']}">`
                else this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict[this.walls_map[py][px]]}">`

                // Import collision
                if(px < 0 || py < 0 || py > this.collision_map.length-1 || px > this.collision_map[py].length-1) this.nodes[y][x].addCollision('.')
                else this.nodes[y][x].addCollision(this.collision_map[py][px])

                // Create player node
                if(y == this.player_node_y && x == this.player_node_x) {
                    this.nodes[y][x].div.id = 'player_node'
                    this.nodes[y][x].div.innerHTML = '<img src="assets/test_textures/arrow_down.png" alt="Sorry. There is no arrow."></img>'
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

                    if(node.position_x < 0 || node.position_y < 0 || node.position_y >= this.background_map.length || node.position_x >= this.background_map[node.position_y].length) {
                        this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict['.']})`
                    }
                    else this.nodes[y][x].div.style.backgroundImage = `url(${this.texture_dict[this.background_map[node.position_y][node.position_x]]})`

                    if(node.position_x < 0 || node.position_y < 0 || node.position_y >= this.walls_map.length || node.position_x >= this.walls_map[node.position_y].length) {
                        this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict['n']}">`
                    }
                    else this.nodes[y][x].div.innerHTML = `<img src="${this.texture_dict[this.walls_map[node.position_y][node.position_x]]}">`

                    if(node.position_x < 0 || node.position_y < 0 || node.position_y >= this.collision_map.length || node.position_x >= this.collision_map[node.position_y].length) {
                        this.nodes[y][x].addCollision('.')
                    }
                    else this.nodes[y][x].addCollision(this.collision_map[node.position_y][node.position_x])
                })
            })

            Player.position_x += XY[key][0]
            Player.position_y += XY[key][1]
            this.player_x += XY[key][0]
            this.player_y += XY[key][1]
        }

        // Set player node image
        document.getElementById('player_node').innerHTML = `<img src="assets/test_textures/arrow_${KEY_MAP[key]}.png" alt="Sorry. There is no arrow.">`

        active_wsad_key = null

        return 1
    }
}