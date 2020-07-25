/**
 * 
 * hi im ban
 * most of this code was made for nodejs
 * so thats why things are messy and 
 * some are repetitive.
 * i've never actually made js that wasnt for nodejs so theres probably some bad code
 * anyways usually all of these classes are in seperate files, but uh. 
 * enjoy looking through this garbage
 */


let actions = {};
// get JSON 
var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://raw.githubusercontent.com/EnjoyYourBan/enjoyyourban.github.io/master/actions.json", false );
    xmlHttp.send(null);
    actions = JSON.parse(xmlHttp.responseText);
/**
 * 
 * MCItem Class
 * probably not well made, cant' access minecraft for testing rn
 */

/**
 * 
 * Value Class
 */
 class Value {
     constructor(value, target="default") {
        this.item = {
            id: 'g_val',
            data: {
                type: value,
                target: target
            }
        }
        this.slot = 0;
     }

     setSlot(slot) {
         this.slot = slot;
         return this;
     }
 }

// GameValue = Value;
const GameValue = Value;

// REMOVED <buggy>
/**
 * 
 * PARTICLE CLASS
 */
class Particle {
    constructor(particle) {
        this.item = {
            id: 'part',
            data: {
                particle: particle,
                count:1,
                speed:0,
                dx:0,
                dy:0,
                dz:0
            }
        }
        this.slot = 0;
    }

    setSlot(slot) {
        this.slot=slot;
        return this;
    }
}
/**
 * 
 * SOUND CLASS
 */
//{"item":{"id":"part","data":{"particle":"Cloud","count":1,"speed":0.0,"dx":0.0,"dy":0.0,"dz":0.0}},"slot":1}]},"action":""}]
class Sound {
    constructor(sound, pitch=1, vol=1) {
        this.item = {
            id: 'snd',
            data: {
                sound: sound,
                pitch: pitch,
                vol: vol
            }
        }
        this.slot = 0;
    }

    setSlot(slot) {
        this.slot = slot;
        return this;
    }
}
/**
 * 
 * ITEM CLASS (outdated)
 */
class Item {
    constructor(data) {
        this.item = {
            id: data.id || "txt",
            data: {
                name: data.name || "Text Variable"
            }
        };
        this.slot = data.slot || 0;
    }
}
/**
 *
 * Num
 */
class Num {
    constructor(value, slot=0) {
        this.item = {
            id: "num",
            data: { name: value }
        }
        this.slot = slot;
    }

        setSlot(slot) {
            this.slot = slot;
            return this;
        }

}

/**
 * 
 * VARIABLE CLASS
 */
class Variable {
    /**
     * @param {String} name Variable reference name
     * @param {String} [varType="unsaved"] - Variable type, [local, saved, unsaved]
     */
    constructor(name, varType='unsaved', slot=0) {
        this.item = {
            id: 'var',
            data: {
                name: name,
                scope: varType
            }
            
        }
        this.slot = slot;
    }

    setSlot(slot) {
        this.slot = slot;
        return this;
    }
}
/**
 * 
 * POTION CLASS
 */
class Potion {
    /**
     * @param {String} effect The effect the potion gives
     * @param {Int} length The duration of the potion effect in seconds
     * @param {Int} [amplifier=1] - Potion amplifier level
     * @param {Int} [slot=0] - The items slot when in a chest
     */
    constructor(effect, length, amplifier, slot=0) {
        this.item = {
            id: 'pot',
            data: {
                pot: effect,
                dur: length,
                amp: amplifier
            }
            
        }
        this.slot = slot;
    }

    setSlot(slot) {
        this.slot = slot;
        return this;
    }
}
/**
 * 
 * LOCATION CLASS
 */
class Location {
    /**
     * @param {int} x - x float
     * @param {Float} y - y float
     * @param {Float} z - z float
     * @param {Float} pitch - pitch float
     * @param {Float} yaw - yaw float
     */
    constructor(x=0.0, y=0.0, z=0.0, pitch=0.0, yaw=0.0) {
        this.item = {
            id: 'loc',
            data: {
                loc: {
                    x: x,
                    y: y,
                    z: z,
                    pitch: pitch,
                    yaw: yaw
                },
                isBlock: false
            }
        }
        this.slot = 0;

    }


    setSlot(slot) {
        this.slot=slot;
        return this;
    }
}

class CodeLine {
    /**
     * @param blockType blockType, accepts 'event', 'entity_event', 'func'
     */
    constructor(blockType, event) {
        // throw an error if blockType doesnt exist

        this.blocks = [{
            block: blockType,
            id: "block",
            args: {
                items: [
                    
                ]
            },
            action: event
        }]
    }
    //

    /**
     * @param {String} type The Player Action Name  
     * @param  {...any} args Item arguements, Strings and numbers automatically build items.
     * @returns {CodeLine} Codeline 
     */
    playerAction(type, ...args) {
        this._buildBlock('player_action', type, ...args);
        return this;
    }

        /**
     * @param {String} type The SetVar Action Name  
     * @param  {...any} args Item arguements, Strings and numbers automatically build items.
     * @returns {CodeLine} Codeline 
     */
    setVar(type, ...args) {
        this._buildBlock('set_var', type, ...args);
        return this;
    }

    /**
     * @param {String} type The Game Action Name  
     * @param  {...any} args Item arguements, Strings and numbers automatically build items.
     * @returns {CodeLine} Codeline 
     */
    gameAction(type, ...args) {
        this._buildBlock('game_action', type, ...args);
        return this;
    }

    _bracket(type, sticky=false) {
        // {"id":"bracket","type":"norm","direct":"open"}
        this.blocks.push({
            id: "bracket",
            type: sticky ? "repeat" : "norm",
            direct: type ? "close" : "open"
        })
    }

    _buildBlock(block, type, ...args) {
        const tags = this._parseTags(type, block);
        this.blocks.push({
            block: block,
            id: "block",
            args: {
                items: [
                    ...args.map((item, i) => {
                        if (typeof item != 'number' && typeof item != 'string') return Object.assign({}, item.setSlot(i)); // Creates a shallow copy of the item with the new slot
                        return new Item({
                            id: typeof item == 'number' ? 'num' : 'txt',
                            name: item.toString(),
                            slot: i
                    })}),

                    ...tags
                ],
            },
            action: type
        });
    }

    _parseTags(type, blockType="player_action"){
        const blockData = actions[type];
        if (!blockData) return [];
        const tags = [];
        for (let i = 0; i < blockData.tags.length; i++)
        {
            const tag = blockData.tags[i]
            tags.push({
                item: {
                    id: 'bl_tag',
                    data: {
                        tag: tag.name,
                        option: tag.defaultOption,
                        action: type,
                        block: blockType
                    }
                },
                slot: 26-i
            })
        }

        return tags;
    }
    /**
     * @description Takes a function, carries the CodeLine object as function paramter.
     * @param {String} type The action for the If.
     * @param {any[]} [args] Items that will be placed in the chest
     * @param {Function} main f => { f.PlayerAction() }
     */
    ifPlayer(type, ...args) {
        let func = args.length ? args.pop() : null;
        this._buildBlock('if_player', type, ...args)

        this._bracket(0);
        func(this);
        this._bracket(1);

        return this;
    }

    /**
     * @description Takes a function, carries the CodeLine object as function paramter.
     * @param {String} type The action for the If.
     * @param {any[]} [args] Items that will be placed in the chest
     * @param {Function} main f => { f.PlayerAction() }
     */
    ifGame(type, ...args) {
        let func = args.length ? args.pop() : null;
        this._buildBlock('if_game', type, ...args)

        this._bracket(0);
        func(this);
        this._bracket(1);

        return this;
    }

    /**
     * @description Takes a function, carries the CodeLine object as function paramter.
     * @param {String} type The action for the If.
     * @param {any[]} [args] Items that will be placed in the chest
     * @param {Function} main f => { f.PlayerAction() }
     */
    ifVar(type, ...args) {
        let func = args.length ? args.pop() : null;
        this._buildBlock('if_var', type, ...args)

        this._bracket(0);
        func(this);
        this._bracket(1);

        return this;
    }

    /**
     * @description Takes a function, carries the CodeLine object as function paramter.
     * @param {String} type The action for the If.
     * @param {any[]} [args] Items that will be placed in the chest
     * @param {Function} main f => { f.PlayerAction() }
     */
    ifEntity(type, ...args) {
        let func = args.length ? args.pop() : null;
        this._buildBlock('if_entity', type, ...args)

        this._bracket(0);
        func(this);
        this._bracket(1);

        return this;
    }
    

    /**
     * @description Takes a function, carries the CodeLine object as function paramter.
     * @param {String} type The action for the Repeat.
     * @param {any[]} [args] Items that will be placed in the chest
     * @param {Function} main f => { f.PlayerAction() }
     */
    repeat(type, ...args) {
        let func = args.length ? args.pop() : null;
        this._buildBlock('repeat', type, ...args)

        this._bracket(0, true);
        func(this); //
        this._bracket(1, true);

        return this;
    }
    // AutoIf(type, func) {
    //     this.IfPlayer(type);
    //     func(this);
    //     this._bracket(1);
    //     return this;
    // }

    // close() {
    //     this._bracket(1);
    //     return this;
    // }


    build() {
        let data = pako.gzip(JSON.stringify(this));
        data = btoa(String.fromCharCode.apply(null, new Uint16Array(data)));
        return { 
            json: JSON.stringify(this, null, 4),
            give: `/give @p minecraft:ender_chest{PublicBukkitValues:{"hypercube:codetemplatedata":'{"author":"Prismarine","name":"Prismarine Template","version":1,"code":"${data}"}'},display:{Name:'{"text":"DFText Template"}'}}`,
            encoded: data
        }

    }

    target(target) {
        this.blocks[this.blocks.length-1].target = target;
        return this;
    }

    // not() {
    //     // not doesnt work becasue it sucks
    // }


    
}

const codeLine = CodeLine;

