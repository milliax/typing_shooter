import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        timeRemain: state.game.timeRemain
    };
}

function Timer({ ...props }) {

    return (
        <div className="text-white">
            Timer:
            <div>
                {`${Math.floor(props.timeRemain / 60)}:${paddingZero(props.timeRemain % 60)}`}
            </div>
        </div>
    )
}

const paddingZero = (number) => {
    return `00${number}`.slice(-2)
}

export default connect(mapStateToProps)(Timer)