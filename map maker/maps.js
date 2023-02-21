const Maps = {
    Empty : {
        Name : "",

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


    Deafault : this.Empty,
}

class ActiveMap {
    name = ""

    Background = []

    Walls = []

    Collision = []

    Items = []

    Creatures = []

    addColumn() {

    }

    addRow() {

    }
}