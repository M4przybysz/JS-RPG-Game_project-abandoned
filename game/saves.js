var Active_save = {}
var Imported_save = {}

const Texture_dict = { // Dictionary containing texture corresponding to its id
    // Test textures
    undefined : './assets/null.png',
    null :      './assets/null.png',
    'n' :       './assets/null.png',
    '.' :       './assets/void.png',
    'f' :       './assets/test_textures/floor.png',
    'w' :       './assets/test_textures/wall.png',
    'ls' :      './assets/test_textures/location_switch.png',

    // Map textures
    "sch_floor" : "./assets/maps/school_floor.png",
    "sch_in_corner1" : "./assets/maps/school_inside_corner1.png",
    "sch_in_corner2" : "./assets/maps/school_inside_corner2.png",
    "sch_in_corner3" : "./assets/maps/school_inside_corner3.png",
    "sch_in_corner4" : "./assets/maps/school_inside_corner4.png",
    "sch_in_lwall" : "./assets/maps/school_inside_left_wall.png",
    "sch_in_rwall" : "./assets/maps/school_inside_right_wall.png",
    "sch_in_uwall" : "./assets/maps/school_inside_up_wall.png",
    "sch_out_wall1" : "./assets/maps/school_out_wall1.png",
    "sch_out_wall2" : "./assets/maps/school_out_wall2.png",
    "sch_out_wall3" : "./assets/maps/school_out_wall3.png",
    "sch_out_win" : "./assets/maps/school_out_window.png",

    "grass" : "./assets/maps/grass.png",
    "pavement_horizontal" : "./assets/maps/pavement_horizontal.png",
    "pavement_vertical" : "./assets/maps/pavement_vertical.png",
    "pavement_bot_left" : "./assets/maps/pavement_bottom_left.png",
    "pavement_bot_right" : "./assets/maps/pavement_bottom_right.png",
    "pavement_top_left" : "./assets/maps/pavement_top_left.png",
    "pavement_top_right" : "./assets/maps/pavement_top_right.png",

    "doors" : "./assets/maps/Doors.png",
    "stairs" : "./assets/maps/Stairs.png",
    // Map objects
    'fire' :    './assets/objects/fire.png',

    // Items
    'stick' : './assets/items/stick.png', // ./assets/items/
    'coin' : './assets/items/coin.png',
    'rich_longsword' : './assets/items/rich_longsword.png',
    'magic_short_sword' : './assets/items/magic_short_sword.png',
    'healing_potion' : './assets/items/healing_potion.png',
    'mana_potion' : './assets/items/mana_potion.png',
    'iron_torso_armor' : './assets/items/iron_torso_armor.png',
    'iron_legs_armor' : './assets/items/iron_legs_armor.png',
    'iron_head_armor' : './assets/items/iron_head_armor.png',
    'bread' : './assets/items/bread.png',

    // Creature textures
    'c_friendly' : './assets/creatures/green.png',  //---v
    'c_neutral' : './assets/creatures/yellow.png',  //-> test textures
    'c_hostile' : './assets/creatures/red.png',     //---^
}

const Start_save = {
    Player : {
        name : null,
        class : null,
        direction : 'S',
        location : 'Test2',
        position_x : 3,
        position_y : 3,

        lvl : 0,
        exp : 0,

        max_hp : 100,
        max_mana : 100,

        hp : 100,
        mana : 100,
        defense : 0,
        attack_power : 0,

        equiped_item : null,
        equiped_healing : null,

        head_armor : null,
        torso_armor : null,
        legs_armor : null,

        backpack : [],
        backpack_max_capacity : 18,
    },
    Item_list : {  
       // Armor
        test_iron_head_armor : new Armor('test_iron_head_armor', 'test_iron_head_armor', 3, 4, 'iron_head_armor', 'head', 20),
        test_iron_torso_armor : new Armor('test_iron_torso_armor', 'test_iron_torso_armor', 5, 2, 'iron_torso_armor', 'torso', 20),
        test_iron_legs_armor : new Armor('test_iron_legs_armor', 'test_iron_legs_armor', 5, 1, 'iron_legs_armor', 'legs', 20),

       // Food 
       test_bread : new Food('test_bread', 'test_bread', 2, 4, 'bread', 20),

       // Healing  
        test_healing_potion : new Healing('test_healing_potion', 'test_healing_potion', 5, 5, 'healing_potion', 20),
        test_mana_potion : new Healing('test_mana_potion', 'test_mana_potion', 5, 3, 'mana_potion', 20),
        
       //  Weapons
        test_rich_longsword : new Weapon('test_rich_longsword','test_rich_longsword', 5, 4, 'rich_longsword', 20),
        test_magic_short_sword : new Weapon('test_magic_short_sword', 'test_magic_short_sword', 5, 6, 'magic_short_sword', 20),
        test_stick : new Weapon('test_stick', 'test_stick', 4, 4, 'stick', 10),
    },  
    MapObj_list : {
        test_map_object : new MapObj('test_map_object', 2, 2, 'fire'),
    },
    Creature_list : {
        test_friendly : new Person('test_friendly', 'test_friendly', 1, 13, 'c_friendly', 1, 100, 100),
        test_neutral : new Animal('test_neutral', 'test_neutral', 2, 13, 'c_neutral', 1, 20),
        test_hostile : new Monster('test_hostile', 'test_hostile', 3, 13, 'c_hostile', 1, 20, 50),
    },
    Locations : {
        Test1 : { // Simple room
            name : 'Test1',

            background_map : [  ['.', 'x10/f', '.'],
                                ['x12/f'],
                                ['x12/f'],
                                ['x12/f'],
                                ['x12/f'],
                                ['.', 'x10/f', '.'],
            ],
            walls_map : [       ['n', 'x10/w', 'n'],
                                ['w', 'x10/n', 'w'],
                                ['w', 'x5/n', 'w', 'x4/n', 'w'],
                                ['w', 'x10/n', 'ls'],
                                ['w', 'x10/n', 'w'],
                                ['n', 'x10/w', 'n'],
            ],
            collision_map : [   ['.', 'x10/a', '.'],
                                ['a', 'x10/.', 'a'],
                                ['a', 'x5/.', 'url', 'x4/.', 'a'],
                                ['a', 'x10/.', '.-s:1:3:Test2'],
                                ['a', 'x10/.', 'a'],
                                ['.', 'x10/a', '.'],
            ],
            items : ['test_stick', 'test_iron_head_armor', 'test_bread', ],
            objects : ['test_map_object'],
            creatures : null,
        },
        Test2 : { // Big test room
            name : 'Test2',

            background_map : [  ['x20/f'], 
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'], 
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
                                ['x20/f'],
            ],
            walls_map : [       ['x3/w', 'x3/ls', 'x14/w'],
                                ['w', 'x6/n', 'x6/w', 'x6/n', 'w'],
                                ['ls', 'x7/n', 'x4/w', 'x7/n', 'w'],
                                ['ls', 'x8/n', 'x2/w', 'x8/n', 'w'],
                                ['ls', 'x18/n', 'w'],
                                ['w', 'x8/n', 'x3/w', 'x2/n', 'x3/w', 'x2/n', 'w'],
                                ['w', 'x2/n', 'w', 'x2/n', 'w', 'x2/n', 'w', 'x6/n', 'w', 'x2/n', 'w'],
                                ['w', 'x8/n', 'x3/w', 'x2/n', 'x3/w', 'x2/n', 'w'],
                                ['w', 'x2/n', 'w', 'x2/n', 'w', 'x2/n', 'w', 'x6/n', 'w', 'x2/n', 'w'],
                                ['w', 'x8/n', 'x3/w', 'x2/n', 'x3/w', 'x2/n', 'w'],
                                ['w', 'x2/n', 'w', 'x2/n', 'w', 'x2/n', 'w', 'x6/n', 'w', 'x2/n', 'w'],
                                ['w', 'x8/n', 'x3/w', 'x2/n', 'x3/w', 'x2/n', 'w'],
                                ['w', 'x18/n', 'w'],
                                ['w', 'x18/n', 'w'],
                                ['w', 'x10/n', 'x6/w', 'n', 'x2/w'],
                                ['w', 'x6/n', 'x5/w', 'x4/n', 'w', 'n', 'x2/w'],
                                ['x2/w', 'n', 'x5/w', 'x5/n', 'w', 'x2/n', 'w', 'x2/n', 'w'],
                                ['x2/w', 'n', 'w', 'x3/n', 'w', 'n', 'x2/w', 'n', 'x2/w', 'n', 'x3/w', 'n', 'w'],
                                ['x2/w', 'x3/n', 'w', 'x4/n', 'w', 'n', 'x2/w', 'x5/n', 'w'],
                                ['x20/w'],
            ],
            collision_map : [   ['x3/a', 'x3/.-s:10:3:Test1', 'x14/a'],
                                ['a', 'x6/.', 'x6/a', 'x6/.', 'a'],
                                ['.-s:10:3:Test1', 'x7/.', 'x4/a', 'x7/.', 'a'],
                                ['.-s:10:3:Test1', 'x8/.', 'x2/a', 'x8/.', 'a'],
                                ['.-s:10:3:Test1', 'x18/.', 'a'],
                                ['a', 'x8/.', 'x3/a', 'x2/.', 'x3/a', 'x2/.', 'a'],
                                ['a', 'x2/.', 'a', 'x2/.', 'a', 'x2/.', 'a', 'x6/.', 'a', 'x2/.', 'a'],
                                ['a', 'x8/.', 'x3/a', 'x2/.', 'x3/a', 'x2/.', 'a'],
                                ['a', 'x2/.', 'a', 'x2/.', 'a', 'x2/.', 'a', 'x6/.', 'a', 'x2/.', 'a'],
                                ['a', 'x8/.', 'x3/a', 'x2/.', 'x3/a', 'x2/.', 'a'],
                                ['a', 'x2/.', 'a', 'x2/.', 'a', 'x2/.', 'a', 'x6/.', 'a', 'x2/.', 'a'],
                                ['a', 'x8/.', 'x3/a', 'x2/.', 'x3/a', 'x2/.', 'a'],
                                ['a', 'x18/.', 'a'],
                                ['a', 'x18/.', 'a'],
                                ['a', 'x10/.', 'x6/a', '.', 'x2/a'],
                                ['a', 'x6/.', 'x5/a', 'x4/.', 'a', '.', 'x2/a'],
                                ['x2/a', '.', 'x5/a', 'x5/.', 'a', 'x2/.', 'a', 'x2/.', 'a'],
                                ['x2/a', '.', 'a', 'x3/.', 'a', '.', 'x2/a', '.', 'x2/a', '.', 'x3/a', '.', 'a'],
                                ['x2/a', 'x3/.', 'a', 'x4/.', 'a', '.', 'x2/a', 'x5/.', 'a'],
                                ['x20/a'],
            ],
            items : ['test_healing_potion', 'test_rich_longsword', 'test_magic_short_sword', 'test_mana_potion', 'test_iron_torso_armor', 'test_iron_legs_armor',],
            objects : null,
            creatures : ['test_friendly', 'test_neutral', 'test_hostile'],
        },
    }
}