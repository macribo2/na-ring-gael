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
  
        window.addEventListener('touchstart', (e) => console.log('Touch started', e));
        window.addEventListener('touchend', (e) => console.log('Touch ended', e));
      
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
    // Mark the key as being held down for key events
    this.keyHeld[e.key] = true;
  
    // Directly handle key presses for keyboard input
    if (!this.holdTimer) {
      this.setState(prevState => ({
        input: prevState.input + e.key // Add the normal key to the input immediately
      }));
    }
  };
  
handleTouchStart = (button) => {
   console.log(`Touch start detected for button: ${button}`);
 
  // If the button is already being held, ignore the event
  if (this.keyHeld[button]) return;

  // Mark the button as being held down
  this.keyHeld[button] = true;

  // Start the hold timer for touch interactions
  this.holdTimer = setTimeout(() => {
    this.showOptionsMenu(button); // Show options menu after long press
    this.keyHeld[button] = false; // Reset hold state
  }, 1000); // 1 second hold duration
};

handleTouchEnd = (button) => {
  console.log("Touch ended on button: ", button);
  if (this.holdTimer) {
    clearTimeout(this.holdTimer);
    this.holdTimer = null;

    this.setState(prevState => ({
      input: prevState.input + button
    }));
  }
  this.keyHeld[button] = false;
};
  

  onTouchEnd = (button) => {
    // Call the touch end handler for touch devices
    if (this.isTouchDevice()) {
      this.handleTouchEnd(button);
    }
  };
  
  // Utility function to detect if the user is on a touch device
  isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };
  
  handleKeyUp = (e) => {
    // Clear the hold timer when the button is released
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  
    // Check if the key was held down long enough to trigger options
    const isKeyHeld = this.keyHeld[e.key];
  
    // Only add the key to the input if the options menu was not shown
    if (!isKeyHeld && !this.state.showOptions) {
      this.setState(prevState => ({
        input: prevState.input + e.key // Add the key to the input if it wasn't a long press
      }));
    }
  
    // Reset the key hold state
    this.keyHeld[e.key] = false;
  };
  

  
  onTouchEnd = () => {
    alert();
    // Clear the hold timer when touch ends (button is released before 1 second)
    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
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
  onKeyPress = (button) => {
    let holdTimer;
  
    // Start the timer when the button is pressed (on touchstart)
    const buttonElement = document.querySelector(`.hg-button[data-skbtn="${button}"]`);
    if (buttonElement) {
      buttonElement.addEventListener('touchstart', () => {
        // Start a timer to show the alert after 1500ms
        holdTimer = setTimeout(() => {
          this.showOptionsMenu(button); // Using arrow function to bind 'this' correctly
        }, 1500);
      });
  
      // Cancel the timer if the button is released (on touchend) before 1500ms
      buttonElement.addEventListener('touchend', () => {
        clearTimeout(holdTimer); // Clear the hold timer if released early
      });
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
    ref={this.textareaRef} // Assign the ref to the textarea
    spellCheck={false}
    maxLength="162"
    className="easca-input"
    contentEditable={false}
    value={this.state.input}
    placeholder={""}
    onChange={e => this.onChange(e.target.value)}
    readOnly={true} // Prevent phone keyboard from triggering
    tabIndex="-1"  // Remove focus so that the native keyboard won't appear
/>
        <Keyboard
          display={this.state.display}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onKeyUp={this.handleKeyUp}  // Add this for handling key release
          onTouchEnd={this.onTouchEnd}  // Make sure this handles touch end
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
