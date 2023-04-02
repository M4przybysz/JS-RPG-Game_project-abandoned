class Item {
    use() {}

    constructor(id, name, map_x, map_y, texture, usage = () => {console.log('Hello!!! I am an item!')}) {
        this.id = id
        this.name = name

        this.y = map_y
        this.x = map_x

        this.texture = texture

        this.use = usage
    }
}

class Tool extends Item {
    constructor(id, name, map_x, map_y, texture, usage = () => {console.log('Hello!!! I am a tool!')}) {
        super(id, name, map_x, map_y, texture, usage)
    }
}

class Weapon extends Tool {
    constructor(id, name, map_x, map_y, texture, usage = () => {console.log('Hello!!! I a weapon!')}) {
        super(id, name, map_x, map_y, texture, usage)
    }
}

class Armor extends Item {
    constructor(id, name, map_x, map_y, texture, armor_place, def_value = 0) {
        super(id, name, map_x, map_y, texture, () => {console.log('Hello!!! I am on armor piece!')})

        this.armor_place = armor_place // head, torso, legs
        this.def = def_value // numeric defense value
    }
}

class Consumable extends Item {
    constructor(id, name, map_x, map_y, texture, ) {
        super(id, name, map_x, map_y, texture, () => {console.log('Hello!!! I am a consumable item!')})
    }
}

class Healing extends Consumable {
    constructor(id, name, map_x, map_y, texture, healing_value = 0) {
        super(id, name, map_x, map_y, texture)

        this.healing_value = healing_value // how much item will heal the player
    }
}

class Food extends Consumable {
    constructor(id, name, map_x, map_y, texture, healing_value = 0, ) {
        super(id, name, map_x, map_y, texture, )

        this.healing_value = healing_value
    }
}

//================================================================================================================================
//================================================================================================================================
class MapObj {
    activateEffect() {}

    constructor(id, map_x, map_y, texture = null, effect = () => {}) {
        this.id = id

        this.y = map_y
        this.x = map_x

        this.texture = texture

        this.activateEffect = effect // Overwrite "activateEffect" method
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
