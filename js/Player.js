"use strict"

function Player(nick = 'Playar1', userCoints = 0, inToiletCoints = 0, strick = 1, factor = 1) {
    this.nickname = nick;
    this.countCoints = userCoints;
    this.toiletCoints = inToiletCoints;
    this.catchStrick = strick;
    this.gameFactor = factor;
}

function reviwerPlayer(key, value) {
    if (value instanceof Array) return value;
    if (typeof value == 'object') return new Player(value.nickname,
        value.countCoints, value.toiletCoints, value.catchStrick, value.gameFactor);
    return value;
}
var playar = null;
 