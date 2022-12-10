import './App.css';
import {useEffect} from "react";
import Vector from "./utilities/vector";

function App() {
    
    const card_transitions = [];
    
    let v = new Vector(1, 2);
    v.print();
    
    v = v.normalize();
    v.print();
    
    useEffect(() => {
        const timer = setInterval(() => {
            for (let i = 0; i < card_transitions.length; i++) {
                const ani = card_transitions[i];
                
                let dir = ani.destination.subtract(ani.location);
                let dist = dir.length();
                if (dist >= 1) {
                    // calc
                    let new_location = ani.location.add(dir.multiply(0.1));
                    ani.location = new_location;
                    ani.element.style.left = `${ani.location.x}px`;
                    ani.element.style.top = `${ani.location.y}px`;
                    
                    // scaling
                    const scaling = Math.sin(Math.PI * new_location.calculateLinearInterpolatedFactor(ani.origin, ani.destination));
                    ani.element.style.transform = `scale(${scaling + 1})`;
                } else {
                    ani.location = ani.destination;
                    ani.element.style.left = `${ani.location.x}px`;
                    ani.element.style.top = `${ani.location.y}px`;
                    ani.element.style.transform = `scale(1)`;
                    card_transitions.splice(i, 1);
                    --i;
                    if (ani.onCardAnimationCompleted) {
                        ani.onCardAnimationCompleted();
                    }
                }
            }
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    const Card = (props) => {
        const type = props.type || 'uno';
        let css = '';
        return (
            <div id={props.id} className={`app--card ${(props.outline ? 'app--card-selectable' : '')}`} onClick={props.onClicked} style={{
                backgroundImage: `url(cards/${type}.png)`
            }}>
                {props.outline && (
                    <div className="app--card-outline"></div>
                )}
            </div>
        );
    };
    
    const onCardClicked = (card) => {
        console.log(card.currentTarget);
        const bounds = card.currentTarget.getBoundingClientRect();
        console.log(card.currentTarget.getBoundingClientRect());
        
        card.currentTarget.style.visibility = 'hidden';
        
        const clone = card.currentTarget.cloneNode();
        clone.style.position = 'fixed';
        clone.style.visibility = 'visible';
        // -3 is the margin on card...
        clone.style.left = `${bounds.left - 3}px`;
        clone.style.top = `${bounds.top - 3}px`;
        
        window.document.getElementsByTagName('body')[0].appendChild(clone);
        
        const dest_bounds = document.getElementById('card_id_place').getBoundingClientRect();
        
        const onCardAnimationCompleted = () => {
            console.log('animation completed');
        };
        
        card_transitions.push({
            element: clone,
            origin: new Vector(
                bounds.left - 3,
                bounds.top - 3
            ),
            location: new Vector(
                bounds.left - 3,
                bounds.top - 3
            ),
            destination: new Vector(
                dest_bounds.left - 3,
                dest_bounds.top - 3
            ),
            onCardAnimationCompleted
        });
    };

    return (
        <div className="app--board">
            <h3>Opponent</h3>
            <div className="app--center">
                <Card type="uno"/>
                <Card type="uno"/>
                <Card type="uno"/>
            </div>
            <div className="app--center" style={{
                margin: '50px 0 50px 0'
            }}>
                <Card id="card_id_stack" type="uno"/>
                <Card id="card_id_place" type="blue_two"/>
            </div>
            <h3>You</h3>
            <div className="app--center">
                <Card type="red_plus2" onClicked={onCardClicked}/>
                <Card type="yellow_three" onClicked={onCardClicked}/>
                <Card type="blue_eight" outline={true} onClicked={onCardClicked}/>
                <Card type="red_two" outline={true} onClicked={onCardClicked}/>
                <Card type="blue_nine" outline={true} onClicked={onCardClicked}/>
            </div>
            <div className="app--center" style={{
                marginTop: '20px'
            }}>
                <footer>Click on a card to play your turn</footer>
            </div>
        </div>
    );
}

export default App;
