import React from 'react';
import './easca.css';
import consoleBg from '../../images/mapFrame2.png';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default class Easca extends React.Component {
  constructor() {
    super();
    this.state = {
      layoutName: 'easca',
      holdTimer: null, // Timer to track button hold
      options: [], // State to store the options for the menu
      input: "",
      display: {
        '{space}': ' ',
        '{backspace}': '⬅',
        '{enter}': '↵',
        '{alt}': 'ᵹ',
        '{shift}': '⇧',
        '{send}': 'seol',
        '{mode}': '>_'
      },
      showEasca: true,
      showOptions: false,
    };

    this.keyHeld = {}; // Object to track key hold state
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('showEasca', this.handleShowEasca);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('showEasca', this.handleShowEasca);
  }

  handleShowEasca = () => {
    this.setState({ showEasca: true });
  };

  handleKeyDown = (e) => {
    // If the key is already being held down, ignore the event
    if (this.keyHeld[e.key]) return;

    // Mark the key as held down
    this.keyHeld[e.key] = true;

    // Start the hold timer when any key is pressed
    this.holdTimer = setTimeout(() => {
      this.showOptionsMenu(e.key); // Show options menu when held
    }, 1000); // Long press duration
  };

  handleKeyUp = (e) => {
    // Clear the hold timer when the button is released
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.setState({ holdTimer: null }); // Reset holdTimer in the state
    }
  
    // Check if the key was held down long enough to trigger options
    const isKeyHeld = this.keyHeld[e.key];
  
    // Only add the key to the input if it wasn't held long enough to show options
    if (!isKeyHeld && !this.state.showOptions) {
      this.setState(prevState => ({
        input: prevState.input + e.key // Add the normal key to the input
      }));
    }
  
    // Reset the key hold state
    this.keyHeld[e.key] = false;
  };
  
  onKeyPress = (button) => {
    console.log("Button pressed", button);
    
    // Clear any existing timer before starting a new one
    if (this.state.holdTimer) {
      clearTimeout(this.state.holdTimer);
    }
    
    // Start a new timer for 1 second
    const timer = setTimeout(() => {
      this.showOptionsMenu(button); // Show options menu when button is held
    }, 1000); // Adjust hold time if needed
    
    // Store the timer in the state
    this.setState({ holdTimer: timer });
    
    // Check if the options menu is already shown to prevent adding the character
    if (!this.state.showOptions) {
      // Handle normal key press immediately (e.g., input normal character)
      this.setState(prevState => ({
        input: prevState.input + button // Add the button to the input
      }));
    }
  };
  
  handleOptionClick = (option) => {
    this.setState((prevState) => ({
      input: prevState.input.slice(0, -1) + option, // Replace last character with selected option
      showOptions: false,
      options: [] // Clear options
    }));
  
    // Reset key hold state so that normal input resumes
    Object.keys(this.keyHeld).forEach(key => this.keyHeld[key] = false);
  };
  
  showOptionsMenu = (button) => {
    let options = [];

    // Define additional options based on the pressed button
    switch (button) {
      case 'a':
        options = ['á', 'Á', '7', 'A'];
        break;
      case 'e':
        options = ['é', 'É', 'E'];
        break;
      case 'i':
        options = ['í', 'Í', 'I'];
        break;
      case 'o':
        options = ['ó', 'Ó', 'O'];
        break;
      case 'u':
        options = ['ú', 'Ú', 'U'];
        break;
      case 'f':
        options = ['ḟ', 'fh', 'Fh', 'F'];
        break;
      case 'g':
        options = ['ġ', 'gh', 'Gh', 'G'];
        break;
      case 't':
        options = ['ṫ', 'th'];
        break;
      case 'm':
        options = ['ṁ', 'mh'];
        break;
      default:
        options = [];
    }

    if (options.length > 0) {
      this.setState({ options, showOptions: true }); // Show the options menu
    }
  };


  handleShift = () => {
    this.setState({
      layoutName: this.state.layoutName === "shift" ? "easca" : "shift"
    });
  };

  restoreDefaultKeyboard = () => {
    this.setState({ layoutName: "easca" });
  };

  handleAlt = () => {
    this.setState({
      layoutName: this.state.layoutName === "alt" ? "easca" : "alt"
    });
  };

  handleSend = () => {
    const { input } = this.state;
    localStorage.setItem('eascaInput', input);
    this.setState({ input: "" });
    this.closeEasca();
  };

  closeEasca = () => {
    this.setState({ showEasca: false });
  };

  render() {
    if (!this.state.showEasca) return null;

    return (
      <>
        <div className="bg-container">
          <img src={consoleBg} alt="stone frame" id="console-bg" />
        </div>
        <textarea
          maxLength="162"
          className="easca-input"
          value={this.state.input}
          placeholder={""}
          onChange={e => this.onChange(e.target.value)}
        />
        <Keyboard
          display={this.state.display}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          layoutName={this.state.layoutName}
          className="easca-2"
          layout={{
            easca: [
              "e r t u i o p {backspace}",
              "a s d f g h l",
              "c b n m . ? {alt}",
              "{shift} {space} {enter} {send}"
            ],
            shift: [
              "E R T U I O P {backspace}",
              "A S D F G H L",
              "C B N M , ! {alt}",
              "{shift} {space} {enter} {send}"
            ],
            alt: [
              "é q w ú í ó _ {backspace}",
              "á _ _ _ _ y {mode}",
              "_ _ z _ ⁊ x {alt}",
              "{shift} {space} {enter} {send}"
            ]
          }}

          disableButtonHold={true} // Disable button hold for the keyboard
        />

        {this.state.showOptions && (
          <div className="options-menu">
            {this.state.options.map(option => (
              <button key={option} onClick={() => this.handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        )}
      </>
    );
  }
}
