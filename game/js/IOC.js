class Item {
    constructor(id, name, map_x, map_y, ) {
        this.id = id
        this.name = name

        this.y = map_y
        this.x = map_x
    }
}

class Tool extends Item {
    constructor(id, name, map_x, map_y, ) {
        super(id, name, map_x, map_y, )
    }
}

class Weapon extends Tool {
    constructor(id, name, map_x, map_y, ) {
        super(id, name, map_x, map_y, )
    }
}

class Armor extends Item {
    constructor(id, name, map_x, map_y, ) {
        super(id, name, map_x, map_y, )
    }
}

class Consumable extends Item {
    constructor(id, name, map_x, map_y, ) {
        super(id, name, map_x, map_y, )
    }
}

//================================================================================================================================
//================================================================================================================================
class MapObj {
    constructor(id, name, map_x, map_y, img) {
        this.id = id
        this.name = name

        this.y = map_y
        this.x = map_x

        this.img = img
    }
}

//================================================================================================================================
//================================================================================================================================
class Creature {
    constructor(id, name, map_x, map_y, max_health, max_mana, ) {
        this.id = id
        this.name = name

        this.y = map_y
        this.x = map_x

        this.max_health = max_health
        this.health = this.max_health

        this.max_mana = max_mana
        this.mana = max_mana
    }
}

class NPC extends Creature {
    constructor(id, name, map_x, map_y, max_health, max_mana, ) {
        super(id, name, map_x, map_y, max_health, max_mana, )
    }
}

class Animal extends Creature {
    constructor(id, name, map_x, map_y, max_health, ) {
        super(id, name, map_x, map_y, max_health, 0, )
    }
}

class Monster extends Creature {
    constructor(id, name, map_x, map_y, max_health, max_mana, ) {
        super(id, name, map_x, map_y, max_health, max_mana, )
    }
}

//================================================================================================================================
//================================================================================================================================
