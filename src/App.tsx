
import React, { Component } from 'react'

type Props = {

}
type State = {

}
class App extends Component<Props, State>{
    state = {
        count: 0
    }
    handleClick = () => {
        const { count } = this.state
        this.setState({
            count: count+1
        },() => console.log(this.state.count))
    }
    render() {
        return (
            <div>
                <button onClick = { () => console.log(this) }>点击</button>
            </div>
        )
    }
}

export default App