class Node {
    constructor(position_x, position_y, map_object = null, items = null, creature = null) {
        this.div = document.createElement('div')

        this.position_x = position_x
        this.position_y = position_y

        // this.div.textContent = `${position_x} : ${position_y}`
        this.div.classList.add('node')

        this.object = map_object
        this.items = items
        this.creature = creature
    }

    addCollision(id) {
        if(id == 'a') this.collision = 'udlr' // 'a' means 'all' while setting collision
        else this.collision = id
    }
}

const Grid = {
    grid_width : 19,
    grid_height : 10,
    player_node_x : 9, // Position x of player_node in grid
    player_node_y : 5, // Position y of player_node in grid

    // Layered maps of the game
    nodes : [],
    background_map : [], walls_map : [], collision_map : [],
    items_map : null, objects_map : null, creatures_map : null,

    container : document.getElementById('game_grid_container'),
    grid : document.getElementById('game_grid'),

    importLayer(location, layer) {
        this[layer] = []

        let multinode_regex = new RegExp(/^[x]\d+\/[a-zA-Z\.]+(-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+)?$/) // Multinode notation - x axis
        let x_multiplier = 0
        let id = ''

        location[layer].map((row, y) => {
            this[layer].push([])
            row.map((node, x) => {
                if(multinode_regex.test(node)) { // Check for multinode notation 
                    x_multiplier = parseInt(node.split('/')[0].replace('x', '')) // Extract multiplier from notation
                    id = node.split('/')[1] // Extract texture id from notation

                    for(let i = 0; i < x_multiplier; i++) { this[layer][y].push(id) } // Push multiple ids
                }
                else this[layer][y].push(location[layer][y][x].replace(/ /g, '')) // Push single id
            })
        })
    },

    importIOC(location, IOClist, ioc) {
        let grid_ioc_map = ioc + '_map'
        this[grid_ioc_map] = []

        // Create 2d array of id as big as background_map array
        this.background_map.map((row, y) => {
            this[grid_ioc_map].push([])
            row.map(() => {
                this[grid_ioc_map][y].push(null)
            })
        })

        if(location[ioc] != null && Object.keys(Active_save[IOClist]).length != 0) { // Check if any IOC id is set in this location
            let list = Active_save[IOClist]

            // Write IOC id at the right place
            location[ioc].map((id) => {
                this[grid_ioc_map][list[id].y][list[id].x] = list[id].id
            })
            // console.log(this[IOC])
        }
    },

    importLocation(location_name) { // Import every layer of location map
        let location = Active_save.Locations[location_name]

        this.nodes = [] // Clear nodes before renderring new location
        
        this.importLayer(location, 'background_map')
        this.importLayer(location, 'walls_map')
        this.importLayer(location, 'collision_map')

        this.importIOC(location, 'Item_list', 'items')
        this.importIOC(location, 'MapObj_list', 'objects')
        this.importIOC(location, 'Creature_list', 'creatures')

        this.loadGrid() // Load Grid for new location
    },

    // Simplify checking of Grid node's position in relation to entire location layer
    nodeInLayerAction(x, y, layer, action_if_true, action_if_false) { 
        if(x < 0 || y < 0 || y > this[layer].length-1 || x > this[layer][y].length-1) {
            action_if_false() // Action if node position is outside the layer map
            return
        }
        action_if_true() // Action if node position is inside the layer map
    },

    loadGrid() {
        this.grid.innerHTML = ""

        // Create Grid nodes
        for(let y = 0, py = Player.position_y-this.player_node_y; y < this.grid_height; y++, py++) {
            this.nodes.push([])
            for(let x = 0, px = Player.position_x-this.player_node_x; x < this.grid_width; x++, px++) {
                this.nodes[y].push(new Node(px, py))

                // Create background
                this.nodeInLayerAction(px, py, 'background_map', 
                    () => {this.nodes[y][x].div.style.backgroundImage = `url(${Texture_dict[this.background_map[py][px]]})`}, 
                    () => {this.nodes[y][x].div.style.backgroundImage = `url(${Texture_dict['.']})`}) 

                // Create "walls"
                this.nodeInLayerAction(px, py, 'walls_map', 
                    () => {this.nodes[y][x].div.innerHTML = `<img src="${Texture_dict[this.walls_map[py][px]]}">`},
                    () => {this.nodes[y][x].div.innerHTML = `<img src="${Texture_dict['n']}">`}) 

                // Apply collision
                this.nodeInLayerAction(px, py, 'collision_map',
                    () => {this.nodes[y][x].addCollision(this.collision_map[py][px])},
                    () => {this.nodes[y][x].addCollision('.')}) 

                // Create map objects
                if(this.objects_map != null) {
                    this.nodeInLayerAction(px, py, 'objects_map',
                        () => {this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.objects_map[py][px] != null) ? Active_save.MapObj_list[this.objects_map[py][px]].texture : 'n']}">`},
                        () => {this.nodes[y][x].div.innerHTML += ''})
                }

                // Create items
                if(this.items_map != null) {
                    this.nodeInLayerAction(px, py, 'items_map', 
                        () => {this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.items_map[py][px] != null) ? Active_save.Item_list[this.items_map[py][px]].texture : 'n']}">`},
                        () => {this.nodes[y][x].div.innerHTML += ''})
                }

                // Create creatures
                if(this.creatures_map != null) {
                    this.nodeInLayerAction(px, py, 'creatures_map',
                    () => {this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.creatures_map[py][px] != null) ? Active_save.Creature_list[this.creatures_map[py][px]].texture : 'n']}">`},
                    () => {this.nodes[y][x].div.innerHTML += ''})
                }

                // Create player node
                if(y == this.player_node_y && x == this.player_node_x) {
                    this.nodes[y][x].div.id = 'player_node'
                    this.nodes[y][x].div.innerHTML += `<img src="assets/player/player_${KEY_DICT[Player.direction]}.png" alt="Sorry. There is no arrow."></img>`
                }
            }
        }

        // Load nodes to html
        this.nodes.map(row => {
            row.map(node => this.grid.appendChild(node.div))
        })

        // console.log(this.nodes)
    },

    moveGrid(key) {
        // Check if Player is accessing a new location
        let switch_location = new RegExp(/^[a-zA-Z\.]+-s:\d+:\d+:[a-zA-Z0-9=+<>()\[\]{}_\-]+$/)
        if(switch_location.test(this.nodes[this.player_node_y][this.player_node_x].collision)) {
            let str = this.nodes[this.player_node_y][this.player_node_x].collision
            str = str.replace(/^[a-zA-Z\.]{1,4}-s:/, '').split(':')

            Player.position_x = parseInt(str[0])
            Player.position_y = parseInt(str[1])
            let new_location = str[2]

            Player.location = new_location
            Grid.importLocation(new_location)

            return
        }

        if(key === null) return // Check if any of WSAD keys is pressed

        const XY = { // Return [x, y] valuses used to change all nodes positions
            'W' : [0, -1],
            'S' : [0, 1],
            'A' : [-1, 0],
            'D' : [1, 0],
        }

        // Check collision
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
                    this.nodeInLayerAction(node.position_x, node.position_y, 'background_map', 
                        () => {this.nodes[y][x].div.style.backgroundImage = `url(${Texture_dict[this.background_map[node.position_y][node.position_x]]})`}, 
                        () => {this.nodes[y][x].div.style.backgroundImage = `url(${Texture_dict['.']})`})

                    // Draw 'walls'
                    this.nodeInLayerAction(node.position_x, node.position_y, 'walls_map', 
                        () => {this.nodes[y][x].div.innerHTML = `<img src="${Texture_dict[this.walls_map[node.position_y][node.position_x]]}">`}, 
                        () => {this.nodes[y][x].div.innerHTML = `<img src="${Texture_dict['n']}">`}) 

                    // Apply collision
                    this.nodeInLayerAction(node.position_x, node.position_y, 'collision_map', 
                        () => {this.nodes[y][x].addCollision(this.collision_map[node.position_y][node.position_x])},
                        () => {this.nodes[y][x].addCollision('.')}) 

                    // Draw map objects and activate their effects
                    if(this.objects_map != null) {
                        this.nodeInLayerAction(node.position_x, node.position_y, 'objects_map',
                            () => {
                                this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.objects_map[node.position_y][node.position_x] != null) ? Active_save.MapObj_list[this.objects_map[node.position_y][node.position_x]].texture : 'n']}">`
                                if(this.objects_map[node.position_y][node.position_x] != null) {
                                    Active_save.MapObj_list[this.objects_map[node.position_y][node.position_x]].activateEffect()
                                }
                            },
                            () => {this.nodes[y][x].div.innerHTML += ''})
                    }

                    // Draw items
                    if(this.items_map != null) {
                        this.nodeInLayerAction(node.position_x, node.position_y, 'items_map',
                            () => {this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.items_map[node.position_y][node.position_x] != null) ? Active_save.Item_list[this.items_map[node.position_y][node.position_x]].texture : 'n']}">`},
                            () => {this.nodes[y][x].div.innerHTML += ''})
                    }

                    // Draw creatures
                    if(this.creatures_map != null) {
                        this.nodeInLayerAction(node.position_x, node.position_y, 'creatures_map',
                            () => {
                                this.nodes[y][x].div.innerHTML += `<img src="${Texture_dict[(this.creatures_map[node.position_y][node.position_x] != null) ? Active_save.Creature_list[this.creatures_map[node.position_y][node.position_x]].texture : 'n']}">`
                                if(this.creatures_map[node.position_y][node.position_x] != null) {
                                    node.addCollision('a')
                                }
                            },
                            () => {this.nodes[y][x].div.innerHTML += ''})
                    }

                })
            })

            // Change Player position in the location 
            Player.position_x += XY[key][0]
            Player.position_y += XY[key][1]
        }

        // Set wall texture under player node
        document.getElementById('player_node').innerHTML = `<img src="${
            Texture_dict[(Player.position_y >= 0 && Player.position_y < this.walls_map.length && Player.position_x >= 0 && Player.position_x < this.walls_map[Player.position_y].length) ? this.walls_map[Player.position_y][Player.position_x] : 'n']
        }">`

        // Set map object texture under playr node
        if(this.objects_map != null && this.objects_map[Player.position_y][Player.position_x] != null) {
            document.getElementById('player_node').innerHTML += `<img src="${
                Texture_dict[(Player.position_y >= 0 && Player.position_y < this.objects_map.length && Player.position_x >= 0 && Player.position_x < this.objects_map[Player.position_y].length) ? Active_save.MapObj_list[this.objects_map[Player.position_y][Player.position_x]].texture : 'n']
            }">`   
        }

        // Set item texture under playr node
        if(this.objects_map != null && this.items_map[Player.position_y][Player.position_x] != null) {
            document.getElementById('player_node').innerHTML += `<img src="${
                Texture_dict[(Player.position_y >= 0 && Player.position_y < this.items_map.length && Player.position_x >= 0 && Player.position_x < this.items_map[Player.position_y].length) ? Active_save.Item_list[this.items_map[Player.position_y][Player.position_x]].texture : 'n']
            }">`   
        }

        // Set player node image
        document.getElementById('player_node').innerHTML += `<img src="assets/player/player_${KEY_DICT[key]}.png" alt="Sorry. There is no arrow.">`
        Player.direction = key
    }
}