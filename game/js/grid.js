class Node {
    constructor(position_x, position_y, bg_texture=null, l0_texture=null, l1_texture=null, l2_texture=null) {
        this.div = document.createElement('div')

        this.position_x = position_x
        this.position_y = position_y

        this.div.textContent = `${position_x} : ${position_y}`
        this.div.classList.add('node')

        this.bg_texture = bg_texture
        this.l0_texture = l0_texture
        this.l1_texture = l1_texture
        this.l2_texture = l2_texture
    }
}

var Grid = {
    grid_width : 19,
    grid_height : 10,
    player_node_x : 9, // x position of player_node in grid
    player_node_y : 5, // y position of player_node in grid

    // layered maps of the game
    bg_map : null,
    l0_map : null,
    l1_map : null,
    l2_map : null,
    nodes : [],

    player_x : 20, // player starting position x
    player_y : 20, // player starting position y

    container : document.getElementById('game_grid_container'),
    grid : document.getElementById('game_grid'),

    loadGrid : function() {
        this.grid.innerHTML = ""

        // Create nodes
        for(let y = 0, py = this.player_y-this.player_node_y; y < this.grid_height; y++, py++) {
            this.nodes.push([])
            for(let x = 0, px = this.player_x-this.player_node_x; x < this.grid_width; x++, px++) {
                this.nodes[y].push(new Node(px, py))
                if(y == this.player_node_y && x == this.player_node_x) { // Create player node
                    this.nodes[y][x].div.id = 'player_node'
                    this.nodes[y][x].div.innerHTML = '<img src="assets/test_arrows/arrow_down.png" alt="Sorry. There is no arrow."></img>'
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
        const XY = { // Return [x, y] valuses used to change all nodes positions
            'W' : () => {return [0, -1]},
            'S' : () => {return [0, 1]},
            'A' : () => {return [-1, 0]},
            'D' : () => {return [1, 0]}
        }

        // Udate position of nodes in grid
        this.nodes.map(row => {
            row.map(node => {
                node.position_x = node.position_x + XY[key]()[0]
                node.position_y = node.position_y + XY[key]()[1]
                node.div.textContent = `${node.position_x} : ${node.position_y}`
            })
        })

        return 1
    }
}