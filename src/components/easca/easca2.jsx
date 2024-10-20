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
    this.textareaRef = React.createRef(); // Create a ref for the textarea

    this.keyHeld = {}; // Object to track key hold state
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('showEasca', this.handleShowEasca);
        // Focus the textarea on component mount
        if (this.textareaRef.current) {
          this.textareaRef.current.focus();
        }
  }

  componentDidUpdate(prevProps, prevState) {
    // Focus the textarea when the state changes and the textarea is visible
    if (this.state.showEasca && this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
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
// Find the button element and add the pressed class
const buttonElement = document.querySelector(`.hg-button[data-skbtn="${button}"]`);
if (buttonElement) {
  buttonElement.classList.add('pressed');
}
setTimeout(()=>{

    // Remove 'pressed' class when the touch ends
    const pressedButtons = document.querySelectorAll('.hg-button.pressed');
    pressedButtons.forEach((button) => {
      button.classList.remove('pressed');
    });
},100)
if (button === "{shift}") {
  // Call the handleShift method to toggle between layouts
  this.handleShift();
} 
if (button === "{alt}") {
  // Call the handleShift method to toggle between layouts
  this.handleAlt();
} 
if (button === "{send}") {
  // Call the handleShift method to toggle between layouts
  this.handleSend();
} 
if (button === "{backspace}") {
  // Call the handleShift method to toggle between layouts
  this.handleBackspace();
} 
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

  // Handle special cases like {space} to insert a space character
  let newInput = button === '{space}' ? ' ' : button; 
  
  // Check if the options menu is already shown to prevent adding the character
  if(!["{shift}", "{alt}", "{backspace}","{send}","{enter}"].includes(button)) {
  
    // Handle normal key press immediately (e.g., input normal character)
    this.setState(prevState => ({
      input: prevState.input + newInput // Add the button to the input
    }));
  }
};

handleBackspace = () => {
  this.setState((prevState) => ({
    input: prevState.input.slice(0, -1) // Remove the last character from the input
  }));
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
  
    switch (button) {
      case 'a':
        options = ['a','á', 'Á', '7', 'A'];
        break;
        case 'b':
          options = ['b', 'B', 'bh', 'ḃ'];
          break;
          case 'c':
            options = ['c', 'C', 'ch', 'ċ'];
            break;
            case 'd':
              options = ['d', 'D', 'dh', 'ḋ'];
              break;
              case 'e':
                options = ['e','é', 'É', 'E'];
        break;
        case 'f':
          options = ['f', 'F','ḟ', 'fh', 'Fh','Ḟ'];
          break;
        case 'g':
          options = ['g','ġ', 'gh', 'G', 'Gh','Ġ'];
          break;
          case 'i':
            options = ['i','í', 'Í', 'I'];
            break;
            case 'm':
              options = ['m','ṁ','mh','M','Mh',];
              break;
        case 'o':
          options = ['o','ó', 'Ó', 'O'];
        break;
        case 'p':
          options = ['p', 'P', 'ph', 'ṗ'];
          break;
          case 'r':
            options = ['r', 'R', 'rh', 'ɼ'];
            break;
            case 's':
              options = ['s', 'S', 'sh', 'ṡ'];
              break;
              case 't':
                options = ['t', 'T', 'th', 'ṫ'];
                break;
      case 'u':
        options = ['u','ú', 'Ú', 'U'];
        break;
      case 't':
        options = ['t','ṫ', 'th','T','Ṫ'];
        break;
        
      default:
        options = [];
    }
  
    if (options.length > 0) {
      this.setState({ options, showOptions: true });
  
      // Set a timer to auto-hide the options menu after 3 seconds
      if (this.hideOptionsTimer) {
        clearTimeout(this.hideOptionsTimer); // Clear any existing timer
      }
      this.hideOptionsTimer = setTimeout(() => {
        this.setState({ showOptions: false, options: [] });
      }, 3000); // 3 seconds
    }
  };
  
  // Ensure the timer is cleared when the component unmounts to prevent memory leaks
  componentWillUnmount() {
    if (this.hideOptionsTimer) {
      clearTimeout(this.hideOptionsTimer);
    }
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('showEasca', this.handleShowEasca);
  }
  

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
         ref={this.textareaRef} // Assign the ref to the textarea
         spellCheck={false}
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
