tab_counter = 0
new_tab_number = 0
max_tab_count = 7

let EditedMap = new ActiveMap('EMpty', DefaultMaps.Empty)

class Node {
    div = document.createElement('div')

    constructor(node_x, node_y, bg_id, w_id, coll_id) {
        this.x = node_x
        this.y = node_y
        
        this.background = IDs.textures[bg_id]
        this.wall = IDs.textures[w_id]
        this.collision = IDs.collision[coll_id]
        
        this.div.setAttribute('id', `node_x${node_x}_y${node_y}`)
        this.div.setAttribute('class', 'node node_border')
        this.div.style.backgroundImage = `url(${this.background})`

        this.div.innerHTML = `  <div class="collision ${(this.collision == 'none') ? "" : 
                                                        (this.collision == 'all') ? 'collision-r collision-l collision-u collision-d' : 
                                                        (this.collision == 'up') ? 'collision-u' : 
                                                        (this.collision == 'down') ? 'collision-d' :
                                                        (this.collision == 'right') ? 'collision-r' : 'collision-l'}">
                                    ${this.collision}
                                </div>`
    }

    object = null
    item = null
    creature = null
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
    let map_container = document.getElementById('map_container')

    MapContainer.showMap(EditedMap)
}

function showGridLines(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.classList.add('node_border')
            })
        })
    }
    else {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.classList.remove('node_border')
            })
        })
    }
}

function showCollision(checkbox) {
    if(checkbox.checked) {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.querySelector('.collision').style.display = 'block'
            })
        })
    }
    else {
        MapContainer.nodes.map((row, y) => {
            row.map((node, x) => {
                node.div.querySelector('.collision').style.display = 'none'
            })
        })
    }
}