import React, { Component } from 'react';
import karen from './karen.js';
import kristian from './kristian.js';
import maren from './maren.js';
import arvid from './arvid.js';

class Gronnbolle extends Component {
    constructor(props) {
        super(props)
        this.state = { timer: 0, items: [], rounds: [ 'Alias', 'Miming', 'Puppet show', 'Lyd' ], itemIdx: 0, roundIdx: 0, ferdig: false, newRound: true, between: false }
        setInterval(() => {
            const counter = Math.max(this.state.timer - 1, 0)
            this.setState({ timer: counter })
        }, 1000);
    }
    
    randomize = l => {
        const oldItems = [...l]
        const randomized = []
        while (oldItems.length > 0) {
            const idx = Math.random() * oldItems.length;
            const el = oldItems.splice(idx, 1);
            randomized.push(el)
        }

        return randomized
    }

    shuffleBack = () => {
        const idx = this.state.itemIdx;
        const l = this.state.items.length;
        const diff = (l-1) - idx;
        const swapIdx = idx + parseInt(Math.random() * diff);
        const itemsCopy = [...this.state.items];

        const temp = itemsCopy[idx];
        itemsCopy[idx] = itemsCopy[swapIdx];
        itemsCopy[swapIdx] = temp;

        this.setState({ items: itemsCopy, between: true })
    }

    componentDidMount() {
        const it = []
        karen.forEach(e => it.push(e))
        maren.forEach(e => it.push(e))
        arvid.forEach(e => it.push(e))
        kristian.forEach(e => it.push(e))
        const rand = this.randomize(it)

        this.setState({ items: rand })
    }


    render() {
        const { items, rounds, itemIdx, roundIdx, ferdig, newRound, timer, between } = this.state;
        const handleClick = (e) => {
            if (e.keyCode === 8) {
                this.shuffleBack();
                return;
            }
            if (e.keyCode === 13) {
                this.setState({ timer: 40 })
                return;
            }
            if (e.keyCode === 32 && timer !== 0) {
                if (newRound) {
                    this.setState({ newRound: false, between: false })
                } else if (between) {
                    this.setState({ between: false })
                }
                else if (!between && itemIdx === items.length - 1) {
                    if (roundIdx === rounds.length - 1) {
                        this.setState({ ferdig: true })
                    } else {
                        const rand = this.randomize(items)
                        this.setState({ items: rand, itemIdx: 0, roundIdx: roundIdx + 1, newRound: true, between: false })
                    }
                } else {
                    this.setState({ itemIdx: itemIdx + (between ? 0 : 1), between: false })
                }
            }
        }

        const round = <p> {rounds[roundIdx]} </p>
        const item = <h2> {items[itemIdx]} </h2>

        return (
            <div onKeyUp={handleClick} tabIndex="0" style={{ height: '100%', width: '100%', backgroundColor: timer === 0 ? 'red' : ''}}>
                { !ferdig && round }
                { !ferdig && <h2> { this.state.timer } </h2> }
                { !between && !newRound && !ferdig && item }
                { ferdig && <p> FERDIG!!! </p>}
            </div>
        );
    }
}

export default Gronnbolle;