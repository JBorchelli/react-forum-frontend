import "../App.scss";
import {useSelector} from 'react-redux';

const Background = () => {

    const darkMode = useSelector(state => state.preferences.darkMode);

    return(
        <div className={darkMode? "background-dark" : "background-light"}>
        </div>
    );
}

export default Background;