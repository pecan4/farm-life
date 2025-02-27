namespace SpriteKind {
    export const plant = SpriteKind.create()
    export const no_collisions = SpriteKind.create()
    export const tile_selector = SpriteKind.create()
}
function plant_plant (num: number) {
    timer.background(function () {
        if (1 <= parseFloat(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Tooltip))) {
            if (tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile`)) {
                tiles.setTileAt(highlighted_tile_sprite.tilemapLocation(), plant_on_tile_image_array[num * 4])
                tiles.setDataNumber(highlighted_tile_sprite.tilemapLocation(), "stage", 0)
                tiles.setDataNumber(highlighted_tile_sprite.tilemapLocation(), "type", num)
                tiles.setDataNumber(highlighted_tile_sprite.tilemapLocation(), "grow cycles", 0)
                tiles.setDataNumber(highlighted_tile_sprite.tilemapLocation(), "last day watered", -1)
                toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].set_text(ItemTextAttribute.Tooltip, convertToText(parseFloat(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Tooltip)) - 1))
                toolbarinventory_update()
            }
        }
    })
}
function read_plant_data (text: string) {
    tempreadvar = text.split(",")
    tiles.setTileAt(tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])), plant_on_tile_image_array[parseFloat(tempreadvar[0]) * 4 + parseFloat(tempreadvar[4])])
    tiles.setDataNumber(tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])), "type", parseFloat(tempreadvar[0]))
    tiles.setDataNumber(tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])), "grow cycles", parseFloat(tempreadvar[1]))
    tiles.setDataNumber(tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])), "last day watered", parseFloat(tempreadvar[2]))
    tiles.setDataNumber(tiles.getTileLocation(parseFloat(tempreadvar[3].split(".")[0]), parseFloat(tempreadvar[3].split(".")[1])), "stage", parseFloat(tempreadvar[4]))
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
events.tileEvent(SpriteKind.Player, assets.tile`myTile12`, events.TileEvent.StopOverlapping, function (sprite) {
    selling = false
})
function rain_sfx () {
    music.setVolume(255)
    music.play(music.createSoundEffect(
    WaveShape.Noise,
    250,
    250,
    255,
    255,
    5000,
    SoundExpressionEffect.None,
    InterpolationCurve.Linear
    ), music.PlaybackMode.LoopingInBackground)
    while (0 == 0) {
        pause(randint(1000, 10000))
        music.play(music.createSoundEffect(
        WaveShape.Sawtooth,
        5000,
        250,
        152,
        255,
        250,
        SoundExpressionEffect.Warble,
        InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
    }
}
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
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(selling)) {
        toolbar.set_items(toolbar_items)
        inventory.set_items(inventory_items)
        toolbar.update()
        inventory.update()
        pause(100)
        if (inventory_not_open) {
            inventory_not_open = false
        } else {
            inventory_not_open = true
            inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 1)
            toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 8)
            hotbar_selected = true
        }
    } else {
        inventory_not_open = true
        inventory.set_color(InventoryColorAttribute.InventorySelectedOutline, 1)
        toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 8)
        hotbar_selected = true
    }
})
function make_plant_names_array () {
    plant_names_array = [
    "Carrot",
    "Green beans",
    "Tomatoes",
    "Broccoli",
    "Peppers"
    ]
}
function compress_plant_data (mySprite: Sprite, col: number, row: number) {
    return "" + tiles.readDataNumber(tiles.getTileLocation(col, row), "type") + "," + tiles.readDataNumber(tiles.getTileLocation(col, row), "grow cycles") + "," + tiles.readDataNumber(tiles.getTileLocation(col, row), "last day watered") + "," + ("" + col + "." + row) + "," + tiles.readDataNumber(tiles.getTileLocation(col, row), "stage")
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
            color.startFade(color.originalPalette, color.Black, 500)
            color.pauseUntilFadeDone()
            pause(100)
            color.startFade(color.Black, color.originalPalette, 500)
            grow()
            day += 1
            tileUtil.replaceAllTiles(assets.tile`myTile10`, assets.tile`myTile`)
        }
        myMenu.close()
        A_interact = true
        move = true
    })
})
function create_all_items_array () {
    all_items = [
    Inventory.create_item("Hoe", assets.image`Hoe`, "-1"),
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
        `, "-1"),
    Inventory.create_item("Watering Can", assets.image`watering can`, "-1"),
    Inventory.create_item("Carrot", assets.image`carrot`, "5"),
    Inventory.create_item("Green bean seeds", assets.image`green bean seeds`, "1"),
    Inventory.create_item("Green beans", assets.image`green beans`, "7"),
    Inventory.create_item("Tomato seeds", assets.image`tomato seeds1`, "1"),
    Inventory.create_item("Tomatoes", assets.image`tomatoes`, "10"),
    Inventory.create_item("Broccoli seeds", assets.image`broccoli seeds`, "1"),
    Inventory.create_item("Broccoli", assets.image`broccoli`, "13"),
    Inventory.create_item("Luke", assets.image`Luke broccoli`, "100"),
    Inventory.create_item("Pepper seeds", assets.image`pepper seeds`, "1"),
    Inventory.create_item("Peppers", assets.image`peppers`, "18")
    ]
    plant_items_location_in_all_items_array = [
    4,
    6,
    8,
    10,
    12
    ]
    mini_menu_shop_items_array = [
    miniMenu.createMenuItem("Carrot Seeds", assets.image`carrot seeds`),
    miniMenu.createMenuItem("Green bean seeds", assets.image`green bean seeds`),
    miniMenu.createMenuItem("Tomato seeds", assets.image`tomato seeds1`),
    miniMenu.createMenuItem("Broccoli seeds", assets.image`broccoli seeds`),
    miniMenu.createMenuItem("Pepper seeds", assets.image`pepper seeds`)
    ]
    item_sell_values_array = [
    3,
    4,
    3,
    5,
    7
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
                if (!(selling)) {
                    if (32 != inventory_items.length) {
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
                } else {
                    sell(toolbar.get_number(ToolbarNumberAttribute.SelectedIndex), false)
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
                if (!(selling)) {
                    if (7 != toolbar_items.length) {
                        if (inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)]) {
                            toolbar_items.push(inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)])
                            inventory_items.removeAt(inventory.get_number(InventoryNumberAttribute.SelectedIndex))
                            inventory.set_items(inventory_items)
                            inventory.update()
                            toolbar.set_items(toolbar_items)
                            toolbar.update()
                            if (0 < inventory.get_number(InventoryNumberAttribute.SelectedIndex)) {
                                inventory.change_number(InventoryNumberAttribute.SelectedIndex, -1)
                            }
                            pauseUntil(() => !(controller.A.isPressed()))
                        }
                    }
                } else {
                    sell(inventory.get_number(InventoryNumberAttribute.SelectedIndex), true)
                    pause(100)
                }
            }
        }
    }
}
function toolbarinventory_update () {
    toolbar.set_items(toolbar_items)
    inventory.set_items(inventory_items)
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
                    plant_plant(0)
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Green bean seeds") {
                    plant_plant(1)
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Tomato seeds") {
                    plant_plant(2)
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Broccoli seeds") {
                    plant_plant(3)
                } else if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Pepper seeds") {
                    plant_plant(4)
                } else {
                	
                }
            }
        }
    }
})
function delete_items_with_0_tooltip () {
    for (let value of toolbar.get_items()) {
        if (value.get_text(ItemTextAttribute.Tooltip) == "0") {
            toolbar_items.removeAt(toolbar.get_items().indexOf(value))
        }
    }
    for (let value of inventory.get_items()) {
        if (value.get_text(ItemTextAttribute.Tooltip) == "0") {
            inventory_items.removeAt(inventory.get_items().indexOf(value))
        }
    }
    toolbar.set_items(toolbar_items)
    inventory.set_items(inventory_items)
    toolbar.update()
    inventory.update()
}
function grow () {
    for (let value2 of plant_on_tile_image_array) {
        for (let value of tiles.getTilesByType(water_to_image(value2.clone()))) {
            tiles.changeDataNumber(value, "grow cycles", 1)
            if (tiles.readDataNumber(value, "grow cycles") == plant_stage_instructions[tiles.readDataNumber(value, "type")][tiles.readDataNumber(value, "stage")]) {
                tiles.changeDataNumber(value, "stage", 1)
            }
            tiles.setTileAt(value, plant_on_tile_image_array[tiles.readDataNumber(value, "type") * 4 + tiles.readDataNumber(value, "stage")])
        }
    }
}
function sell (num: number, sell_from_inventory: boolean) {
    if (sell_from_inventory) {
        if (inventory_items[num]) {
            if (parseFloat(inventory_items[num].get_text(ItemTextAttribute.Description)) >= 0 && parseFloat(inventory_items[num].get_text(ItemTextAttribute.Tooltip)) > 0) {
                money += parseFloat(inventory_items[num].get_text(ItemTextAttribute.Description))
                inventory_items[num].set_text(ItemTextAttribute.Tooltip, convertToText(parseFloat(inventory_items[num].get_text(ItemTextAttribute.Tooltip)) + -1))
                if (inventory_items[num].get_text(ItemTextAttribute.Tooltip) == "0") {
                    inventory_items.removeAt(num)
                }
            }
        }
    } else {
        if (toolbar_items[num]) {
            if (parseFloat(toolbar_items[num].get_text(ItemTextAttribute.Description)) >= 0 && parseFloat(toolbar_items[num].get_text(ItemTextAttribute.Tooltip)) > 0) {
                money += parseFloat(toolbar_items[num].get_text(ItemTextAttribute.Description))
                toolbar_items[num].set_text(ItemTextAttribute.Tooltip, convertToText(parseFloat(toolbar_items[num].get_text(ItemTextAttribute.Tooltip)) + -1))
                if (toolbar_items[num].get_text(ItemTextAttribute.Tooltip) == "0") {
                    toolbar_items.removeAt(num)
                }
            }
        }
    }
    toolbar.set_items(toolbar_items)
    inventory.set_items(inventory_items)
    toolbar.update()
    inventory.update()
}
function shop (items: any[]) {
    A_interact = false
    move = false
    shop_menu = miniMenu.createMenuFromArray(items)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        temp_found_bool_var = false
        for (let value of inventory_items) {
            if (value.get_text(ItemTextAttribute.Name) == selection) {
                temp_found_bool_var = true
            } else {
            	
            }
        }
        pauseUntil(() => !(controller.A.isPressed()))
    })
}
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
function plant_tile_harvest () {
    if (inventory_not_open) {
        if (controller.A.isPressed()) {
            if (!(toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)])) {
                if (tiles.readDataNumber(mySprite.tilemapLocation(), "stage") >= 3) {
                    location = mySprite.tilemapLocation()
                    if (inventory_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]]) == -1) {
                        if (toolbar_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]]) == -1) {
                            temp_number = 0
                            inventory_items.push(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]])
                            inventory_items[inventory_items.length - 1].set_text(ItemTextAttribute.Tooltip, "1")
                            toolbarinventory_update()
                            tiles.setTileAt(location, assets.tile`myTile0`)
                            tiles.cleanseData(location)
                        } else {
                            toolbar_items[toolbar_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]])].set_text(ItemTextAttribute.Tooltip, convertToText(parseFloat(toolbar_items[toolbar_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]])].get_text(ItemTextAttribute.Tooltip)) + 1))
                        }
                    } else {
                        inventory_items[inventory_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]])].set_text(ItemTextAttribute.Tooltip, convertToText(parseFloat(inventory_items[inventory_items.indexOf(all_items[plant_items_location_in_all_items_array[tiles.readDataNumber(location, "type")]])].get_text(ItemTextAttribute.Tooltip)) + 1))
                        tiles.setTileAt(location, assets.tile`myTile0`)
                        tiles.cleanseData(location)
                    }
                    tiles.setTileAt(location, assets.tile`myTile0`)
                    tiles.cleanseData(location)
                    toolbarinventory_update()
                }
            }
            pauseUntil(() => !(controller.A.isPressed()))
        }
    }
}
events.tileEvent(SpriteKind.Player, assets.tile`myTile12`, events.TileEvent.StartOverlapping, function (sprite) {
    inventory_not_open = false
    selling = true
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(inventory_not_open)) {
        switch_hotbarinventory()
    }
})
function water_tile_code () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)]) {
        if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Watering Can") {
            if (controller.A.isPressed()) {
                for (let value of plant_on_tile_image_array) {
                    if (tiles.tileAtLocationEquals(tile_selector_collision_sprite.tilemapLocation(), value)) {
                        tiles.setDataNumber(tile_selector_collision_sprite.tilemapLocation(), "last day watered ", day)
                        tiles.setTileAt(tile_selector_collision_sprite.tilemapLocation(), water_to_image(value.clone()))
                    }
                }
            }
        }
    }
}
function if_not_wall_or_floor () {
    return !(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile1`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile2`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile3`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile4`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile5`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile7`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile8`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile9`)) && (!(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile6`)) && !(tiles.tileAtLocationEquals(highlighted_tile_sprite.tilemapLocation(), assets.tile`myTile14`))))))))))
}
function make_plant_on_tile_image_array () {
    for (let value of plant_images_array2) {
        plant_on_tile_image_array.push(img`
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 5 5 7 7 7 7 7 7 7 7 6 7 7 
            7 7 7 5 5 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 6 7 7 7 7 7 7 6 6 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 6 6 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            5 5 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            5 5 7 7 7 7 7 7 7 7 7 7 6 7 7 7 
            7 7 7 7 7 7 5 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 
            `)
        spriteutils.drawTransparentImage(value, plant_on_tile_image_array[plant_images_array2.indexOf(value)], 0, 0)
    }
}
function water_to_image (myImage: Image) {
    temp_image = myImage
    for (let index = 0; index <= 15; index++) {
        for (let index2 = 0; index2 <= 15; index2++) {
            if (index % 2 == 0) {
                if (!(index2 % 2 == 0)) {
                    temp_image.setPixel(index2, index, 9)
                }
            } else {
                if (index2 % 2 == 0) {
                    temp_image.setPixel(index2, index, 9)
                }
            }
        }
    }
    return temp_image
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
let temp_image: Image = null
let temp_number = 0
let location: tiles.Location = null
let temp_found_bool_var = false
let shop_menu: miniMenu.MenuSprite = null
let item_sell_values_array: number[] = []
let mini_menu_shop_items_array: miniMenu.MenuItem[] = []
let plant_items_location_in_all_items_array: number[] = []
let myMenu: miniMenu.MenuSprite = null
let plant_names_array: string[] = []
let plant_images_array2: Image[] = []
let selling = false
let hotbar_selected = false
let tempreadvar: string[] = []
let plant_on_tile_image_array: Image[] = []
let A_interact = false
let move = false
let tile_selector_collision_sprite: Sprite = null
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
[1, 3, 4],
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
day = 1
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
inventory.set_text("")
inventory.setFlag(SpriteFlag.RelativeToCamera, true)
inventory.left = 4
inventory.top = 4
inventory.z = 500
toolbar.z = 500
inventory_items = [
all_items[1],
all_items[3],
all_items[5],
all_items[7],
all_items[9],
all_items[12]
]
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
tile_selector_collision_sprite = sprites.create(img`
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    f f f f f f f f f f f f f f f f 
    `, SpriteKind.tile_selector)
tile_selector_collision_sprite.setFlag(SpriteFlag.Invisible, true)
let day_text_sprite = fancyText.create("Day: " + day, 0, 15, fancyText.rounded_large)
day_text_sprite.setFlag(SpriteFlag.RelativeToCamera, true)
day_text_sprite.setPosition(0 + fancyText.getText(day_text_sprite).length * 6, 15)
day_text_sprite.setFlag(SpriteFlag.Invisible, true)
move = true
A_interact = true
let myEffect = extraEffects.createCustomSpreadEffectData(
[
8,
9,
10
],
false,
extraEffects.createPresetSizeTable(ExtraEffectPresetShape.Spark),
extraEffects.createPercentageRange(0, 25),
extraEffects.createPercentageRange(0, 35),
extraEffects.createTimeRange(200, 400)
)
make_plant_names_array()
inventory.get_items()[0].set_text(ItemTextAttribute.Tooltip, "10")
inventory.get_items()[2].set_text(ItemTextAttribute.Tooltip, "10")
inventory.get_items()[3].set_text(ItemTextAttribute.Tooltip, "10")
inventory.get_items()[4].set_text(ItemTextAttribute.Tooltip, "10")
inventory.get_items()[5].set_text(ItemTextAttribute.Tooltip, "10")
plant_on_tile_image_array = []
let plant_data_array_of_arrays: number[] = []
make_plant_on_tile_image_array()
let money = 0
forever(function () {
    inventory.setFlag(SpriteFlag.Invisible, inventory_not_open)
    menu_movement_code()
    selected_tile_code()
    inventory_not_open_hotbar_code()
    water_tile_code()
    plant_tile_harvest()
    tiles.placeOnTile(tile_selector_collision_sprite, highlighted_tile_sprite.tilemapLocation())
    pause(100)
})
