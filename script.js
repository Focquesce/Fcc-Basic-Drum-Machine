const soundbank = ['https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
];

const audiokeys = [
  {
    glyph: "Q",
    track: soundbank[0]
  },
  {
    glyph: "W",
    track: soundbank[1]
  },
  {
    glyph: "E",
    track: soundbank[2]
  },
  {
    glyph: "A",
    track: soundbank[3]
  },
  {
    glyph: "S",
    track: soundbank[4]
  },
  {
    glyph: "D",
    track: soundbank[5]
  },
  {
    glyph: "Z",
    track: soundbank[6]
  },
  {
    glyph: "X",
    track: soundbank[7]
  },
  {
    glyph: "C",
    track: soundbank[8]
  }
];

function App() { 
  return (
    <div id="display" className="display">
      <h3>Press A Key To Instigate A Sound</h3>
      {audiokeys.map((sound, index) => ( 
        <DrumMachine text={sound.glyph} glyph={index} audio={sound.track} />
      ))}
    </div>
  )
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.audio = React.createRef();
  };
  
  componentDidMount() {
    this.audio.current.addEventListener('ended', (e) => {
      const parent = e.target.parentNode;
      parent.classList.remove('active');
    });
  };
  
  executeAudio = () => {
    this.audio.current.play();
    const id = this.audio.current.id;
    const parent = this.audio.current.parentNode;
    parent.classList.add('active');
    const display = parent.parentNode;
    display.querySelector('h3').innerText = `${id}`;
  };
  
  render() {
    const { text, audio } = this.props;
    return (
      <div className="drum-pad" onClick={this.executeAudio} id={`drum-${text}`}>
        {text}
        <audio ref={this.audio} src={audio} id={text} className="clip" />
      </div>
    );
  };
}; 

document.addEventListener('keydown', e => {
  const id = e.key.toUpperCase();
  const audio = document.getElementById(id);
  if(audio) {
    audio.currentTime = 0;
    const parent = audio.parentNode;
    parent.classList.add('active');
    const display = parent.parentNode;
    display.querySelector('h3').innerText = `${id}`;
    audio.play();
  };
});

ReactDOM.render(<App />, document.getElementById("drum-machine"));
