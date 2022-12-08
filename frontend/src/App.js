import './App.css';

function App() {

    const Card = (props) => {
        const type = props.type || 'uno';
        return (
            <div className={`app--card ${(props.outline ? 'app--card-selectable' : '')}`} style={{
                backgroundImage: `url(cards/${type}.png)`
            }}>
                {props.outline && (
                    <div className="app--card-outline"></div>
                )}
            </div>
        );
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
                <Card type="uno"/>
                <Card type="blue_two"/>
            </div>
            <h3>You</h3>
            <div className="app--center">
                <Card type="red_plus2"/>
                <Card type="yellow_three"/>
                <Card type="blue_eight" outline={true}/>
                <Card type="red_two" outline={true}/>
                <Card type="blue_nine" outline={true}/>
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
