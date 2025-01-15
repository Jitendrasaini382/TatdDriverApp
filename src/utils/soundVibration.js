import {Vibration} from 'react-native';
import Sound from 'react-native-sound';

// Function to play sound and trigger vibration
export const playSound = _sound => {
  console.log('play sound initiated');

  // Load the sound file (ensure the file is in the correct path)
  const sound = new Sound(`${_sound}.mp3`, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load the sound file', error);
      return;
    }

    // Set the volume and play the sound
    sound.setVolume(1.0);
    sound.play(success => {
      if (success) {
        console.log('Sound playback finished');
      } else {
        console.log('Sound playback failed');
      }
    });
  });
};

// Function to trigger continuous vibration using a pattern
export const triggerVibration = () => {
  console.log('Vibration triggered with pattern');

  // Vibration pattern: vibrate for 500ms, pause for 200ms, vibrate for 500ms, etc.
  const pattern = [500, 200, 500, 200, 500, 200, 500, 200]; // Adjust the pattern as needed

  // Trigger the pattern (this will last about 6 seconds in total)
  Vibration.vibrate(pattern, false); // Set the second argument to `true` for looping indefinitely
  console.log('Vibration triggered with pattern for 6 seconds');
};
