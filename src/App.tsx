import React, { PureComponent } from 'react';

interface UserName {
  age: number;
  sex: 'man' | 'woman';
}

function get<T extends UserName>(number: T): T {
  return number;
}
get({ age: 17, sex: 'man' });
 class App extends PureComponent {
  render() {
    return (
      <div>
        123
      </div>
    );
  }
}

export default App;
