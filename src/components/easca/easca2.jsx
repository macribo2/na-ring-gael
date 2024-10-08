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

    this.longPressTimer = null;
    this.holdTimer = null; // Timer for button hold
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

  handleKeyDown = (e) => {
    // If the key is already being held down, ignore the event
    if (this.keyHeld[e.key]) return;

    // Mark the key as held down
    this.keyHeld[e.key] = true;

    // Start the hold timer when any key is pressed
    this.holdTimer = setTimeout(() => {
      alert("Button held for 3 seconds");
    }, 3000);

    // Add the key pressed to the input
    this.setState(prevState => ({
      input: prevState.input + e.key
    }));
  };

  handleKeyUp = (e) => {
    // Clear the hold timer when the button is released
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
    }

    // Reset the key hold state
    this.keyHeld[e.key] = false;
  };

  handleShowEasca = () => {
    this.setState({ showEasca: true });
  };

  handleOptionClick = (option) => {
    this.setState((prevState) => ({
      input: prevState.input + option,
      showOptions: false
    }));
  };

  onChange = input => {
    this.setState({ input });
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);
 // Clear any existing timer before starting a new one
 if (this.state.holdTimer) {
  clearTimeout(this.state.holdTimer);
}

// Start a new timer for 3 seconds
const timer = setTimeout(() => {
  alert("Button held for 3 seconds");
}, 3000);

// Store the timer in the state
this.setState({ holdTimer: timer });

    if (button === "{shift}") {
      this.handleShift();
    } else if (button === "{alt}") {
      this.handleAlt();
    } else if (button === "{send}") {
      this.handleSend();
    } else {
      this.restoreDefaultKeyboard();
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

    // This gets triggered when a button is released or touch ends
    onTouchEnd = () => {
      // Clear the hold timer when touch ends
      if (this.state.holdTimer) {
        clearTimeout(this.state.holdTimer);
        this.setState({ holdTimer: null });
      }
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

          disableButtonHold={true}  // Add this line
    
        />
      </>
    );
  }
}
