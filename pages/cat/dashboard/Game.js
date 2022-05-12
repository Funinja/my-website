import React, { Component } from 'react';
import Phaser from 'phaser';

//1a202c

class Game extends Component {
    game = {};
    bg = '';
    cursors = {};

    componentDidMount(){
        const renderOptions = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'render-game',
            backgroundColor: '#2c1a26',
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };

        this.game = new Phaser.Game(renderOptions);

    };

    preload(){
        this.load.image('bobber', '/star.png');
    }

    create() {
        this.add.image(400, 300, 'bobber');
    }

    update() {

    }

    render() {
        return (
            <div id='render-game'/>
        );
    }
}

export default Game;