controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (toolbar.get_items()[toolbar.get_number(ToolbarNumberAttribute.SelectedIndex)].get_text(ItemTextAttribute.Name) == "Hoe") {
        tiles.setTileAt(mySprite.tilemapLocation(), assets.tile`myTile`)
    }
})
let toolbar: Inventory.Toolbar = null
let mySprite: Sprite = null
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
toolbar = Inventory.create_toolbar([], 7)
toolbar.set_color(ToolbarColorAttribute.BoxOutline, 15)
toolbar.set_color(ToolbarColorAttribute.BoxSelectedOutline, 13)
toolbar.set_color(ToolbarColorAttribute.BoxBackground, 1)
toolbar.set_color(ToolbarColorAttribute.BoxText, 15)
toolbar.setFlag(SpriteFlag.RelativeToCamera, true)
toolbar.setPosition(80, 108)
let hoe_item = Inventory.create_item("Hoe", img`
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
    `, "Use this tool to till soil.")
let toolbar_items = [hoe_item]
forever(function () {
    toolbar.set_items(toolbar_items)
})
