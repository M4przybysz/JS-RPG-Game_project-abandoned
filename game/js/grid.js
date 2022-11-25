class Node {
    constructor(position_x, position_y, bg_texture=null, l0_texture=null, l1_texture=null, l2_texture=null) {
        this.div = document.createElement('div')

        this.div.setAttribute('position_x', position_x)
        this.div.setAttribute('position_y', position_y)
        this.div.textContent = `${position_x}:${position_y}`
        this.div.classList.add('node')

        this.bg_texture = bg_texture
        this.l0_texture = l0_texture
        this.l1_texture = l1_texture
        this.l2_texture = l2_texture
    }
}

var Grid = {
    grid_width : 19,
    grid_height : 9,
    player_node_x : 9,
    player_node_y : 5,

    bg_map : null,
    l0_map : null,
    l1_map : null,
    l2_map : null,
    nodes : [],

    player_x : 0,
    player_y : 0,

    container : document.getElementById('game_grid_container'),
    grid : document.getElementById('game_grid'),

    loadGrid() {
        this.grid.innerHTML = ""

        // Create nodes before central player node
        for(let y = 0, py = this.player_y - this.player_node_y; y <= this.player_node_y; y++, py++) {
            let halt = (y == this.player_node_y) ? this.player_node_x : this.grid_width
            let px_start = (y == this.player_node_y) ? this.player_x : halt - this.player_node_x + this.player_x
            this.nodes.push([])

            for(let x = 0, px = px_start - halt; x < halt; x++, px++) {
                this.nodes[y].push(new Node(px, py))
            }
        }
        console.log(this.nodes)

        // Create player node
        this.nodes[this.player_node_y].push(new Node(this.player_x, this.player_y))
        this.nodes[this.player_node_y][this.player_node_x].div.id = 'player_node'
        this.nodes[this.player_node_y][this.player_node_x].div.innerHTML = '<img src="assets/test_arrows/arrow_down.png" alt="Sorry. There is no arrow."></img>'

        // Create nodes after player node
        for(let y = this.player_node_y, py = this.player_y; y <= this.grid_height; y++, py++) {
            let halt = (y == this.player_node_y) ? this.player_node_x-1 : this.grid_width - 1
            let px_start = (y == this.player_node_y) ? this.player_x + 1 : this.player_node_x - halt + this.player_x
            if(y != this.player_node_y) {
                this.nodes.push([])
            }

            for(let x = 0, px = px_start; x <= halt; x++, px++) {
                this.nodes[y].push(new Node(px, py))
            }
        }

        // Load nodes to html
        this.nodes.map(row => {
            row.map(node => this.grid.appendChild(node.div))
        })


        console.log(this.nodes)
    }
}