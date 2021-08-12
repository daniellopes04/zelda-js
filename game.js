kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: false,
    clearColor: [0,0,0,1]
})

const MOVE_SPEED = 120
const SLICER_SPEED = 100
const SKELETOR_SPEED = 60

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
            'a    $   b',
            '[   }    ]',
            'a        b',
            'xdddddvddz',
        ],        
    ]

    const levelConfig = {
        width: 48,
        height: 48,
        'a': [sprite('left-wall'), solid(), 'wall'],
        'b': [sprite('right-wall'), solid(), 'wall'],
        'c': [sprite('top-wall'), solid(), 'wall'],
        'd': [sprite('bottom-wall'), solid(), 'wall'],
        'w': [sprite('top-right-wall'), solid(), 'wall'],
        'x': [sprite('bottom-left-wall'), solid(), 'wall'],
        'y': [sprite('top-left-wall'), solid(), 'wall'],
        'z': [sprite('bottom-right-wall'), solid(), 'wall'],
        '^': [sprite('top-door'), 'next-level'],
        'v': [sprite('bottom-door')],
        '%': [sprite('left-door'), 'door'],
        '#': [sprite('right-door')],
        '$': [sprite('stairs'), 'next-level'],
        '*': [sprite('slicer'), 'slicer', 'dangerous', {dir: -1}],
        '}': [sprite('skeletor'), 'skeletor', 'dangerous', {dir: -1, timer: 0}],
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
        pos(350, 450),
        layer('ui'),
        {
            value: score
        },
        scale(2)
    ])

    add([text('Level ' + parseInt(level + 1)), pos(350, 485), scale(2)])

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
            level: (level + 1) % maps.length,
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

    keyPress('space', () => {
        spawnKaboom(player.pos.add(player.dir.scale(48)))
    })

    function spawnKaboom(player) {
        const kaboom = add([sprite('kaboom'), pos(player), 'kaboom'])
        wait(1, () => {
            destroy(kaboom)
        })
    }

    collides('kaboom', 'skeletor', (kaboom, skeletor) => {
        camShake(4)
        wait(1, () => {
            destroy(kaboom)
        })

        destroy(skeletor)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    collides('kaboom', 'slicer', (kaboom, slicer) => {
        camShake(4)
        wait(1, () => {
            destroy(kaboom)
        })

        destroy(slicer)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    action('slicer', (slicer) => {
        slicer.move(slicer.dir * SLICER_SPEED, 0)
    })

    collides('slicer', 'wall', (slicer) => {
        slicer.dir = -slicer.dir
    })

    action('skeletor', (skeletor) => {
        skeletor.move(0, skeletor.dir * SKELETOR_SPEED)
        skeletor.timer -= dt()
        
        if (skeletor.timer <= 0) {
            skeletor.dir = -skeletor.dir
            skeletor.timer = rand(5)
        }
    })

    collides('skeletor', 'wall', (skeletor) => {
        skeletor.dir = -skeletor.dir
    })

    player.overlaps('dangerous', () => {
        go('lose', {score: scoreLabel.value})
    })

    player.collides('door', (door) => {
        destroy(door)
    })
})

scene('lose', ({score}) => {
    add([text('You lost...', 32), origin('center'), pos(width()/2, height()/2 - 50)])
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
    add([text('Press enter to play again.', 20), origin('center'), pos(width()/2, height()/2 + 50)])

    keyDown('enter', () => {
        go('game', {level: 0, score: 0})
    })
})

start('game', {level: 0, score: 0})
