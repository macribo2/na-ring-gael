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
    if (e.key === 'G' || e.key === 'g') {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
      }
      this.longPressTimer = setTimeout(() => {
        this.setState({ showOptions: true });
      }, 500); // 500ms for long press detection
    }
  };

  handleKeyUp = (e) => {
    if (e.key === 'G' || e.key === 'g') {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
      }
      if (!this.state.showOptions) {
        this.setState(prevState => ({ input: prevState.input + e.key }));
      }
      this.setState({ showOptions: false });
    }
  };

  handleOptionClick = (option) => {
    this.setState((prevState) => ({
      input: prevState.input + option,
      showOptions: false
    }));
  };

  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

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
    console.log("Sending input:", input);
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
          buttonTheme={[
            {
              class: "hg-red",
              buttons: "Q W E R T Y q w e r t y"
            },
            {
              class: "hg-highlight",
              buttons: "Q q"
            }
          ]}
        />
        {this.state.showOptions && (
          <div className="options-modal">
            <button onClick={() => this.handleOptionClick('ng')}>ng</button>
            <button onClick={() => this.handleOptionClick('gh')}>gh</button>
            <button onClick={() => this.handleOptionClick('G')}>G</button>
            <button onClick={() => this.handleOptionClick('ġ')}>ġ</button>
          </div>
        )}
      </>
    );
  }
}
