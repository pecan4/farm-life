namespace SpriteKind {
    export const plant = SpriteKind.create()
}
function read_plant_data (text: string) {
    tempreadvar = text.split(",")
    plant_sprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.plant)
    sprites.setDataNumber(plant_sprite, "type", parseFloat(tempreadvar[0]))
    sprites.setDataNumber(plant_sprite, "grow cycles", parseFloat(tempreadvar[1]))
    sprites.setDataNumber(plant_sprite, "last day watered", parseFloat(tempreadvar[2]))
    plant_sprite.setImage(plant_images_array[parseFloat(tempreadvar[0]) * 4 + parseFloat(tempreadvar[4])])
    sprites.setDataNumber(plant_sprite, "stage", parseFloat(tempreadvar[4]))
    tiles.placeOnTile(plant_sprite, tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])))
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inventory_not_open)) {
        switch_hotbarinventory()
    }
})
function switch_hotbarinventory () {
    if (hotbar_selected) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, actuall_slot)
        actuall_slot = toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, -1)
        hotbar_selected = false
    } else {
        toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, actuall_slot)
        actuall_slot = toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)
        hotbar_selected = true
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Hoe") {
            place_tile_facing(mySprite, assets.tile`myTile`, false)
        }
    }
})
function compress_plant_data (mySprite: Sprite) {
    return "" + sprites.readDataNumber(mySprite, "type") + "," + sprites.readDataNumber(mySprite, "grow cycles") + "," + sprites.readDataNumber(mySprite, "last day watered") + "," + ("" + mySprite.tilemapLocation().column + "." + mySprite.tilemapLocation().row) + "," + sprites.readDataNumber(mySprite, "stage")
}
function create_all_items_array () {
    all_items = [
    Inventory.create_item("Hoe", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f f f f . . 
        . . . . f f f f f f f f 7 f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . . . . . . 7 7 7 . . . 
        . . . . . . . . . 7 7 7 . . . . 
        . . . . . . . . 7 7 7 . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . 7 7 7 . . . . . . . 
        . . . . . 7 7 7 . . . . . . . . 
        . . . . 7 7 7 . . . . . . . . . 
        . . . 7 7 7 . . . . . . . . . . 
        . . 7 7 7 . . . . . . . . . . . 
        . 7 7 7 . . . . . . . . . . . . 
        . . 7 . . . . . . . . . . . . . 
        `, "0"),
    Inventory.create_item("Carrot Seeds", assets.image`carrot seeds`, "1"),
    Inventory.create_item("empty", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, "2"),
    Inventory.create_item("", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, "3")
    ]
}
function menu_movement_code () {
    if (!(inventory_not_open)) {
        if (hotbar_selected) {
            if (controller.left.isPressed()) {
                if (toolbar_items[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + -1]) {
                    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
                    pauseUntil(() => !(controller.left.isPressed()))
                }
            } else if (controller.right.isPressed()) {
                if (toolbar_items[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) + 1]) {
                    toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
                    pauseUntil(() => !(controller.right.isPressed()))
                }
            }
        } else {
            if (controller.left.isPressed()) {
                if (inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex) + -1]) {
                    inventory.change_number(InventoryNumberAttribute.SelectedIndex, -1)
                    pauseUntil(() => !(controller.left.isPressed()))
                }
            } else if (controller.right.isPressed()) {
                if (inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 1]) {
                    inventory.change_number(InventoryNumberAttribute.SelectedIndex, 1)
                    pauseUntil(() => !(controller.right.isPressed()))
                }
            } else if (controller.up.isPressed()) {
                if (inventory.get_number(InventoryNumberAttribute.SelectedIndex) > 8) {
                    if (inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex) + -8]) {
                        inventory.change_number(InventoryNumberAttribute.SelectedIndex, -8)
                        pauseUntil(() => !(controller.up.isPressed()))
                    }
                } else {
                    inventory.set_number(InventoryNumberAttribute.SelectedIndex, 0)
                }
            } else if (controller.down.isPressed()) {
                if (inventory.get_number(InventoryNumberAttribute.SelectedIndex) < 24) {
                    if (inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 8]) {
                        inventory.change_number(InventoryNumberAttribute.SelectedIndex, 8)
                        pauseUntil(() => !(controller.down.isPressed()))
                    }
                } else {
                    inventory.set_number(InventoryNumberAttribute.SelectedIndex, 31)
                }
            }
            if (controller.A.isPressed()) {
                temp_item = toolbar_items[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]
                toolbar_items[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)] = inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex)]
                inventory_items[inventory.get_number(InventoryNumberAttribute.SelectedIndex)] = temp_item
                pauseUntil(() => !(controller.A.isPressed()))
            }
        }
        toolbarinventory_update()
    }
}
function toolbarinventory_update () {
    toolbar.set_items(toolbar_items)
    inventory.set_items(inventory_items)
    toolbar.update()
    inventory.update()
}
function character_animation () {
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . f . . . . . . . . . . . . 
        . . f . . . . . . . . . . . . . 
        . f . . . . . . . . . . . . . . 
        f f f f f f f f f f f f f f f f 
        . f . . . . . . . . . . . . . . 
        . . f . . . . . . . . . . . . . 
        . . . f . . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . f . . . . . . . . . . . . 
        . . f . . . . . . . . . . . . . 
        . f . . . . . . . . . . . . . . 
        f f f f f f f f f f f f f f f f 
        . f . . . . . . . . . . . . . . 
        . . f . . . . . . . . . . . . . 
        . . . f . . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . . f . . . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . f . . . . . f . . . . . f . . 
        . . f . . . . f . . . . f . . . 
        . . . f . . . f . . . f . . . . 
        . . . . f . . f . . f . . . . . 
        . . . . . f . f . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . f . . . . . f . . . . . f . . 
        . . f . . . . f . . . . f . . . 
        . . . f . . . f . . . f . . . . 
        . . . . f . . f . . f . . . . . 
        . . . . . f . f . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.FacingDown)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . f . . . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . . . f . . 
        . . . . . . . . . . . . . . f . 
        f f f f f f f f f f f f f f f f 
        . . . . . . . . . . . . . . f . 
        . . . . . . . . . . . . . f . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . . . . . . f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . f . . . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . . . f . . 
        . . . . . . . . . . . . . . f . 
        f f f f f f f f f f f f f f f f 
        . . . . . . . . . . . . . . f . 
        . . . . . . . . . . . . . f . . 
        . . . . . . . . . . . . f . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . . . . . . f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . f . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . f . f . . . . . . 
        . . . . f . . f . . f . . . . . 
        . . . f . . . f . . . f . . . . 
        . . f . . . . f . . . . f . . . 
        . f . . . . . f . . . . . f . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    mySprite,
    [img`
        . . . . . . . f . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . f . f . . . . . . 
        . . . . f . . f . . f . . . . . 
        . . . f . . . f . . . f . . . . 
        . . f . . . . f . . . . f . . . 
        . f . . . . . f . . . . . f . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . . . f . . . . . . . . 
        `],
    500,
    characterAnimations.rule(Predicate.FacingUp)
    )
}
function grow () {
    for (let value of sprites.allOfKind(SpriteKind.plant)) {
        if (sprites.readDataNumber(value, "last day watered") == day) {
            sprites.changeDataNumberBy(value, "grow cycles", 1)
        }
        if (sprites.readDataNumber(value, "grow cycles") == plant_stage_instructions[sprites.readDataNumber(value, "type")][sprites.readDataNumber(value, "stage")]) {
            sprites.changeDataNumberBy(value, "stage", 1)
            value.setImage(plant_images_array[sprites.readDataNumber(value, "type") * 4 + sprites.readDataNumber(value, "stage")])
        }
    }
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    toolbarinventory_update()
    if (inventory_not_open) {
        inventory_not_open = false
    } else {
        inventory_not_open = true
    }
})
function place_tile_facing (mySprite: Sprite, myImage: Image, wall: boolean) {
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp))) {
        tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top), myImage)
        tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top), wall)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
        tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), myImage)
        tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right), wall)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown))) {
        tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), myImage)
        tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), wall)
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
        tiles.setTileAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left), myImage)
        tiles.setWallAt(mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left), wall)
    }
}
let temp_item: Inventory.Item = null
let actuall_slot = 0
let hotbar_selected = false
let plant_sprite: Sprite = null
let tempreadvar: string[] = []
let plant_images_array: Image[] = []
let inventory_items: Inventory.Item[] = []
let inventory: Inventory.Inventory = null
let all_items: Inventory.Item[] = []
let toolbar_items: Inventory.Item[] = []
let toolbar: Inventory.Toolbar = null
let mySprite: Sprite = null
let day = 0
let plant_stage_instructions: number[][] = []
let inventory_not_open = false
inventory_not_open = true
plant_stage_instructions = [
[1, 2, 3],
[0, 1],
[0, 0],
[0, 0]
]
blockSettings.writeStringArray("plant array", ["0,0,0,0.0,0"])
let plant_array = blockSettings.readStringArray("plant array")
read_plant_data(plant_array[0])
day = 0
tiles.setCurrentTilemap(tilemap`level3`)
mySprite = sprites.create(img`
    . . . . . . 7 7 7 7 . . . . . . 
    . . . . 7 7 b b b b 7 7 . . . . 
    . . . 7 b 5 1 1 5 5 b b 7 . . . 
    . . 7 b 1 5 b b b 5 5 b 7 . . . 
    . 7 b 1 b b b b b 5 1 b 6 7 . . 
    . 7 1 5 b b b b 5 b b 1 b 6 7 . 
    7 b 1 5 b b 1 1 b b b 1 b c 6 7 
    7 5 b b 5 1 b 1 b b b 1 b c c 7 
    7 5 b b b 1 b 1 b b b 1 6 c c 7 
    7 5 b b b 1 1 b b b b 1 6 c c 7 
    7 5 b b b b 5 b b b 5 5 6 c c 7 
    7 5 5 b b b 5 b b b 1 b 6 c 6 7 
    7 b 5 b b 1 5 5 b 5 1 6 6 7 7 . 
    . 7 b 1 1 5 5 1 1 1 6 6 7 7 7 . 
    . . 7 b b b b b b 6 7 7 7 7 . . 
    . . . 7 7 7 7 7 7 7 7 7 7 . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
scene.cameraFollowSprite(mySprite)
character_animation()
toolbar = Inventory.create_toolbar([], 7)
toolbar.set_color(ToolbarColorAttribute.BoxOutline, 15)
toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 8)
toolbar.set_color(ToolbarColorAttribute.BoxBackground, 1)
toolbar.set_color(ToolbarColorAttribute.BoxText, 15)
toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
toolbar.setPosition(80, 108)
create_all_items_array()
toolbar_items = [all_items[0]]
inventory = Inventory.create_inventory([], 32)
inventory.set_color(InventoryColorAttribute.InventoryOutline, 15)
inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 8)
inventory.set_color(InventoryColorAttribute.InventoryBackground, 1)
inventory.set_color(InventoryColorAttribute.InventoryText, 15)
inventory.setFlag(SpriteFlag.RelativeToCamera, true)
inventory.left = 4
inventory.top = 4
inventory_items = [all_items[1]]
inventory_not_open = true
toolbarinventory_update()
plant_images_array = []
forever(function () {
    menu_movement_code()
})
forever(function () {
    if (inventory_not_open) {
        if (controller.B.isPressed()) {
            controller.moveSprite(mySprite, 0, 0)
            if (controller.left.isPressed()) {
                toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, -1)
                pauseUntil(() => !(controller.left.isPressed()))
            } else if (controller.right.isPressed()) {
                toolbar.change_number(ToolbarNumberAttribute.SelectedIndex, 1)
                pauseUntil(() => !(controller.right.isPressed()))
            }
            if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) > 6) {
                toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 0)
            } else if (toolbar.get_number(ToolbarNumberAttribute.SelectedIndex) < 0) {
                toolbar.set_number(ToolbarNumberAttribute.SelectedIndex, 6)
            }
        } else {
            controller.moveSprite(mySprite, 100, 100)
        }
    } else {
        controller.moveSprite(mySprite, 0, 0)
    }
})
forever(function () {
    inventory.setFlag(SpriteFlag.Invisible, inventory_not_open)
})
