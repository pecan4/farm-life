namespace SpriteKind {
    export const plant = SpriteKind.create()
    export const no_collisions = SpriteKind.create()
}
/**
 * 0 = carrots
 * 
 * 1 = green beans
 * 
 * 2 = tomatoes
 * 
 * 3 = broccoli
 * 
 * 4 = peppers
 */
/**
 * first = type
 * 
 * ,
 * 
 * second# = grow cycles
 * 
 * ,
 * 
 * third# = last day watered
 * 
 * ,
 * 
 * coordinates
 * 
 * ,
 * 
 * stage
 */
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
    if (parseFloat(tempreadvar[0]) == 0) {
        plant_sprite.setImage(plant_images_array2[parseFloat(tempreadvar[0]) * 4 + parseFloat(tempreadvar[4])])
    } else {
        plant_sprite.setImage(plant_images_array2[parseFloat(tempreadvar[0]) * 4 - 1 + parseFloat(tempreadvar[4])])
    }
    sprites.setDataNumber(plant_sprite, "stage", parseFloat(tempreadvar[4]))
    tiles.placeOnTile(plant_sprite, tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])))
    plant_sprite.z = 100
}
function switch_hotbarinventory () {
    if (!(inventory_not_open)) {
        if (hotbar_selected) {
            toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 15)
            inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 8)
            hotbar_selected = false
        } else {
            inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 1)
            toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 8)
            hotbar_selected = true
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (A_interact) {
        if (inventory_not_open) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
                if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Hoe") {
                    if (if_not_wall_or_floor()) {
                        place_tile_facing(mySprite, assets.tile`myTile`, false)
                    }
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Carrot Seeds") {
                    plant_on_tile = true
                    for (let value of sprites.allOfKind(SpriteKind.plant)) {
                        if (value.tilemapLocation() == highlighted_tile_sprite.tilemapLocation()) {
                            plant_on_tile = false
                        }
                    }
                    if (tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile`) && plant_on_tile) {
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
                        sprites.setDataNumber(plant_sprite, "type", 0)
                        sprites.setDataNumber(plant_sprite, "grow cycles", 0)
                        sprites.setDataNumber(plant_sprite, "last day watered", 0)
                        sprites.setDataNumber(plant_sprite, "stage", 0)
                        plant_sprite.setImage(plant_images_array2[0])
                        tiles.placeOnTile(plant_sprite, highlighted_tile_sprite.tilemapLocation())
                    }
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Watering Can") {
                    for (let value of sprites.allOfKind(SpriteKind.plant)) {
                        if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp))) {
                            if (value.tilemapLocation() == mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)) {
                                value.setImage(water_to_image(value.image))
                                sprites.setDataNumber(value, "last day watered", day)
                            }
                        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
                            if (value.tilemapLocation() == mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)) {
                                value.setImage(water_to_image(value.image))
                                sprites.setDataNumber(value, "last day watered", day)
                            }
                        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown))) {
                            if (value.tilemapLocation() == mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)) {
                                value.setImage(water_to_image(value.image))
                                sprites.setDataNumber(value, "last day watered", day)
                            }
                        } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
                            if (value.tilemapLocation() == mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)) {
                                value.setImage(water_to_image(value.image))
                                sprites.setDataNumber(value, "last day watered", day)
                            }
                        } else {
                        	
                        }
                    }
                } else {
                	
                }
            }
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    toolbarinventory_update()
    if (inventory_not_open) {
        inventory_not_open = false
    } else {
        inventory_not_open = true
        inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 1)
        toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 8)
        hotbar_selected = true
    }
})
function plant_images_array () {
    plant_images_array2 = [
    assets.image`carrot s1`,
    assets.image`carrot s2`,
    assets.image`carrot s3`,
    assets.image`carrot s4`,
    assets.image`green bean 1`,
    assets.image`green bean 2`,
    assets.image`green bean 3`,
    assets.image`green bean 4`,
    assets.image`tomato 1`,
    assets.image`tomato 2`,
    assets.image`tomato 3`,
    assets.image`tomato 4`,
    assets.image`broccoli 1`,
    assets.image`broccoli 2`,
    assets.image`broccoli 3`,
    assets.image`broccoli 4`,
    assets.image`pepper 1`,
    assets.image`pepper 2`,
    assets.image`pepper 3`,
    assets.image`pepper 4`
    ]
}
function compress_plant_data (mySprite: Sprite) {
    return "" + sprites.readDataNumber(mySprite, "type") + "," + sprites.readDataNumber(mySprite, "grow cycles") + "," + sprites.readDataNumber(mySprite, "last day watered") + "," + ("" + mySprite.tilemapLocation().column + "." + mySprite.tilemapLocation().row) + "," + sprites.readDataNumber(mySprite, "stage")
}
events.tileEvent(SpriteKind.Player, assets.tile`myTile14`, events.TileEvent.StartOverlapping, function (sprite) {
    A_interact = false
    move = false
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Yes", assets.image`Zzz`),
    miniMenu.createMenuItem("No", assets.image`XZzzX`)
    )
    myMenu.setTitle("Go to sleep?")
    myMenu.setFlag(SpriteFlag.RelativeToCamera, true)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            grow()
            day += 1
        }
        myMenu.close()
        A_interact = true
        move = true
    })
})
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
    Inventory.create_item("Watering Can", assets.image`watering can`, "3")
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
            if (controller.A.isPressed()) {
                if (7 != inventory_items.length) {
                    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
                        inventory_items.push(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)])
                        toolbar_items.removeAt(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex))
                        inventory.set_items(inventory_items)
                        inventory.update()
                        toolbar.set_items(toolbar_items)
                        toolbar.update()
                        pauseUntil(() => !(controller.A.isPressed()))
                    }
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
                if (7 != toolbar_items.length) {
                    if (inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)]) {
                        toolbar_items.push(inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)])
                        inventory_items.removeAt(inventory.get_number(InventoryNumberAttribute.SelectedIndex))
                        inventory.set_items(inventory_items)
                        inventory.update()
                        toolbar.set_items(toolbar_items)
                        toolbar.update()
                        pauseUntil(() => !(controller.A.isPressed()))
                    }
                }
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
function selected_tile_code () {
    if (inventory_not_open) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
            if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Hoe" || (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Carrot Seeds" || (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Watering Can" || false))) {
                highlighted_tile_sprite.setFlag(SpriteFlag.Invisible, false)
                if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingUp))) {
                    tiles.placeOnTile(highlighted_tile_sprite, mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
                } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
                    tiles.placeOnTile(highlighted_tile_sprite, mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
                } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingDown))) {
                    tiles.placeOnTile(highlighted_tile_sprite, mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
                } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft))) {
                    tiles.placeOnTile(highlighted_tile_sprite, mySprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
                }
            } else {
                highlighted_tile_sprite.setFlag(SpriteFlag.Invisible, true)
            }
        } else {
            highlighted_tile_sprite.setFlag(SpriteFlag.Invisible, true)
        }
    } else {
        highlighted_tile_sprite.setFlag(SpriteFlag.Invisible, true)
    }
}
function grow () {
    for (let value of sprites.allOfKind(SpriteKind.plant)) {
        if (sprites.readDataNumber(value, "last day watered") == day) {
            sprites.changeDataNumberBy(value, "grow cycles", 1)
        }
        if (sprites.readDataNumber(value, "grow cycles") == plant_stage_instructions[sprites.readDataNumber(value, "type")][sprites.readDataNumber(value, "stage")]) {
            sprites.changeDataNumberBy(value, "stage", 1)
        }
        if (sprites.readDataNumber(value, "type") == 0) {
            value.setImage(plant_images_array2[sprites.readDataNumber(value, "type") * 4 + sprites.readDataNumber(value, "stage")])
        } else {
            value.setImage(plant_images_array2[sprites.readDataNumber(value, "type") * 4 - 1 + sprites.readDataNumber(value, "stage")])
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inventory_not_open)) {
        switch_hotbarinventory()
    }
})
function if_not_wall_or_floor () {
    return !(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile1`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile2`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile3`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile4`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile5`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile7`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile8`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile9`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile6`)) && !(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile14`))))))))))
}
function water_to_image (myImage: Image) {
    for (let index = 0; index <= 15; index++) {
        for (let index2 = 0; index2 <= 15; index2++) {
            if (index % 2 == 0) {
                if (!(index2 % 2 == 0)) {
                    myImage.setPixel(index2, index, 9)
                }
            } else {
                if (index2 % 2 == 0) {
                    myImage.setPixel(index2, index, 9)
                }
            }
        }
    }
    return myImage
}
function inventory_not_open_hotbar_code () {
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
            if (move) {
                controller.moveSprite(mySprite, 100, 100)
            } else {
                controller.moveSprite(mySprite, 0, 0)
            }
        }
    } else {
        controller.moveSprite(mySprite, 0, 0)
    }
}
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
let myMenu: miniMenu.MenuSprite = null
let plant_on_tile = false
let hotbar_selected = false
let plant_images_array2: Image[] = []
let plant_sprite: Sprite = null
let tempreadvar: string[] = []
let A_interact = false
let move = false
let highlighted_tile_sprite: Sprite = null
let inventory_items: Inventory.Item[] = []
let inventory: Inventory.Inventory = null
let all_items: Inventory.Item[] = []
let toolbar_items: Inventory.Item[] = []
let toolbar: Inventory.Toolbar = null
let mySprite: Sprite = null
let day = 0
let list: number[] = []
let plant_stage_instructions: number[][] = []
let inventory_not_open = false
inventory_not_open = true
plant_stage_instructions = [
[1, 2, 3],
[2, 3, 4],
[1, 3, 5],
[2, 4, 7],
[1, 3, 4]
]
plant_images_array()
blockSettings.writeStringArray("plant array", [])
let plant_array = blockSettings.readStringArray("plant array")
if (0 < list.length) {
    read_plant_data(plant_array[0])
}
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
tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 10))
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
inventory.z = 500
toolbar.z = 500
inventory_items = [all_items[1], all_items[3]]
inventory_not_open = true
toolbarinventory_update()
highlighted_tile_sprite = sprites.create(img`
    f f f f . . . . . . . . f f f f 
    f . . . . . . . . . . . . . . f 
    f . . . . . . . . . . . . . . f 
    f . . . . . . . . . . . . . . f 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    f . . . . . . . . . . . . . . f 
    f . . . . . . . . . . . . . . f 
    f . . . . . . . . . . . . . . f 
    f f f f . . . . . . . . f f f f 
    `, SpriteKind.no_collisions)
move = true
A_interact = true
forever(function () {
    inventory.setFlag(SpriteFlag.Invisible, inventory_not_open)
    menu_movement_code()
    selected_tile_code()
    inventory_not_open_hotbar_code()
})
