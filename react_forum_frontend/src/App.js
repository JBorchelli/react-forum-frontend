import './App.scss';
import FTE from "./components/forum/FTE";
import Background from "./components/Background";
import MainBar from './components/mainbar/MainBar';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core';
import {useSelector} from 'react-redux';
import { red, green, blue, grey, teal, pink, yellow } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route } from 'react-router-dom';
import Forum from './components/forum/Forum';


function App() {

  const darkMode = useSelector(state => state.preferences.darkMode);
  const mainPallet = darkMode ? 'dark' : 'light';
  const darkTheme = createMuiTheme({
    palette: {
      type: mainPallet,
      primary: {main: '#206C97', contrastText: '#fff'},
      secondary: {main: '#DE643F'},
      error: {main: '#E63746'},
      warning: {main: yellow[700]},
      info: {main: '#2CA08F'},
      success: {main: green[800]},
      background: {paper: '#121619EF',
                   contrastText: '#fff',
                   dark: '#121619',
                   main: '#23292F',
                   light: '#343D46', 
                   secondary: '#697268', 
                   bright: '#697268'}
    },
    paper: {
      background: grey[900]
    }
  });
  const lightTheme = createMuiTheme({
    palette: {
      type: mainPallet,
      primary: {main: '#206C97', contrastText: '#fff'},
      secondary: {main: teal[800],},
      error: {main: red[700]},
      warning: {main: yellow[700]},
      info: {main: blue[700]},
      success: {main: green[800]},
      background: {paper: '#D3D8D9DF',
                   contrastText: '#121619',
                   dark: '#4D626A',
                   main: '#718998',
                   light: '#B8C4CC', 
                   secondary: '#697268'                              
      },
      action: {
        hover: '#206C9733'
      }
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <MainBar></MainBar>
        <Background></Background>
        <Route exact path="/">
          <Forum></Forum>
        </Route>
        <Route exact path="/forum">
          <Forum></Forum>
        </Route>
        <Route path="/tomb">
          <FTE></FTE>
        </Route>
      </StylesProvider>  
    </ThemeProvider>
  );
}

export default App;
