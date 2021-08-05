kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
})

const MOVE_SPEED = 120

loadRoot('https://i.imgur.com/')
loadSprite('link-going-left', '9TAAeU2.png')
loadSprite('link-going-right', 'tP1ehqk.png')
loadSprite('link-going-up', '79hgO50.png')
loadSprite('link-going-down', '8m0CpjG.png')
loadSprite('left-wall', 'hKfMXMJ.png')
loadSprite('right-wall', 'Nw2nBSA.png')
loadSprite('top-wall', 'xmB9fGN.png')
loadSprite('bottom-wall', 'uB1zhZi.png')
loadSprite('bottom-left-wall', 'Lg55qtt.png')
loadSprite('bottom-right-wall', 'iUALqqJ.png')
loadSprite('top-left-wall', '7pA0bE8.png')
loadSprite('top-right-wall', 'zJbl3ka.png')
loadSprite('top-door', 'MTLj7Ln.png')
loadSprite('bottom-door', '2XYh4Ci.png')
loadSprite('left-door', 'jqEmCIs.png')
loadSprite('right-door', 'u9TE8fW.png')
loadSprite('fire-pot', 'Q3bffYp.png')
loadSprite('lanterns-up', 'IjF91qq.png')
loadSprite('lanterns-down', 'iFcKCtf.png')
loadSprite('lanterns-right', 'owQrFNB.png')
loadSprite('lanterns-left', 'TYFg6Rp.png')
loadSprite('slicer', 'Dw9BO8l.png')
loadSprite('skeletor', 'sfwvZRz.png')
loadSprite('kaboom', 'FyViWxA.png')
loadSprite('stairs', 'DT6vAF4.png')
loadSprite('bg', 'XpLbKRu.png')

scene('game', ({level, score}) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
            'ycc)cc^ccw',
            'a        b',
            'a      * b',
            'a    +   b',
            '%        b',
            'a    +   b',
            'a   *    b',
            'a        b',
            'xdd(dd(ddz',
        ],
        [
            'yccccccccw',
            'a        b',
            '[        ]',
            'a        b',
            'a        b',
            'a        b',
            '[        ]',
            'a        b',
            'xdddddvddz',
        ],        
    ]

    const levelConfig = {
        width: 48,
        height: 48,
        'a': [sprite('left-wall'), solid()],
        'b': [sprite('right-wall'), solid()],
        'c': [sprite('top-wall'), solid()],
        'd': [sprite('bottom-wall'), solid()],
        'w': [sprite('top-right-wall'), solid()],
        'x': [sprite('bottom-left-wall'), solid()],
        'y': [sprite('top-left-wall'), solid()],
        'z': [sprite('bottom-right-wall'), solid()],
        '^': [sprite('top-door'), 'next-level'],
        'v': [sprite('bottom-door'), 'next-level'],
        '%': [sprite('left-door'), 'next-level'],
        '#': [sprite('right-door'), 'next-level'],
        '$': [sprite('stairs'), 'next-level'],
        '*': [sprite('slicer')],
        '}': [sprite('skeletor')],
        ')': [sprite('lanterns-up'), solid()],
        '(': [sprite('lanterns-down'), solid()],
        ']': [sprite('lanterns-right'), solid()],
        '[': [sprite('lanterns-left'), solid()],
        '+': [sprite('fire-pot'), solid()],
    }

    addLevel(maps[level], levelConfig)

    add([sprite('bg'), layer('bg')])

    const scoreLabel = add([
        text('0'),
        pos(400, 450),
        layer('ui'),
        {
            value: score
        },
        scale(2)
    ])

    add([text('level ' + parseInt(level + 1)), pos(400, 485), scale(2)])

    const player = add([
        sprite('link-going-right'),
        pos(5, 190),
        {
            dir: vec2(1, 0),
        }
    ])

    player.action(() => {
        player.resolve()
    })

    player.overlaps('next-level', () => {
        go('game', {
            level: (level + 1),
            score: scoreLabel.value
        })
    })

    keyDown('left', () => {
        player.changeSprite('link-going-left')
        player.move(-MOVE_SPEED, 0)
        player.dir = vec2(-1, 0)
    })

    keyDown('right', () => {
        player.changeSprite('link-going-right')
        player.move(MOVE_SPEED, 0)
        player.dir = vec2(1, 0)
    })

    keyDown('up', () => {
        player.changeSprite('link-going-up')
        player.move(0, -MOVE_SPEED)
        player.dir = vec2(0, -1)
    })

    keyDown('down', () => {
        player.changeSprite('link-going-down')
        player.move(0, MOVE_SPEED)
        player.dir = vec2(0, 1)
    })
})

start('game', {level: 0, score: 0})