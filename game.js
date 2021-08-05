kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
})

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
loadSprite('left-door', 'jqEmCIs.png')
loadSprite('fire-pot', 'Q3bffYp.png')
loadSprite('lanterns', 'IjF91qq.png')
loadSprite('slicer', 'Dw9BO8l.png')
loadSprite('skeletor', 'sfwvZRz.png')
loadSprite('kaboom', 'FyViWxA.png')
loadSprite('stairs', 'DT6vAF4.png')
loadSprite('bg', 'XpLbKRu.png')

scene('game', () => {
    const map = [
        'a        ',
        'a        ',
        'a        ',
        'a        ',
        'a        ',
        'a        ',
        'a        ',
        'a        ',
        'aaaaaaaaaa',
    ]

    const levelConfig = {
        width: 48,
        height: 48,
        'a': [sprite('left-wall'), solid()]
    }

    addLevel(map, levelConfig)
})

start('game')