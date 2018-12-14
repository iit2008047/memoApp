import {Actions} from 'react-native-router-flux';

export function navigate(routeName, props) {
  Actions[routeName](props);
}

export function popScene() {
  Actions.pop();
}
