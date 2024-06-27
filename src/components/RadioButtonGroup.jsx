import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioButton from './CustomRadioButton';

const RadioButtonMyBooking = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: '1', label: 'Have you talked to the customer ?' },
    { id: '2', label: 'Is the customer not picking up the phone ?' },
    { id: '3', label: 'The customer wants to cancel ?' },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <RadioButton
          key={option.id}
          label={option.label}
          selected={selectedOption === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
});

export default RadioButtonMyBooking;