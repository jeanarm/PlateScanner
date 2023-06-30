import React, { useState, useEffect, useCallback } from 'react';
import { Button, Image, View, Text } from 'react-native';
import TextRecognizer from 'react-native-text-recognition';
import { launchCamera } from 'react-native-image-picker';

const CarPlateScanner = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleCaptureImage = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('Image capture canceled');
      } else if (response.error) {
        console.log('Image capture error:', response.error);
      } else {
        const capturedImageURI = response.assets[0].uri;
        console.log(capturedImageURI);
        console.log(response.assets);
        setImageData(capturedImageURI);
        recognizeImage(capturedImageURI);
      }
    });
  };

  const recognizeImage = useCallback(async imageURI => {
    try {
      console.log("BB");
      // const recognizer = new TextRecognizer();
      console.log("AA");
      const result = await TextRecognizer.recognize(imageURI);
      console.log("ABC", result);
      setRecognizedText(result.reduce((previous, value)=>`${previous} ${value}`));
    } catch (error) {
      console.log('Error recognizing image:', error);
    } finally {
      // recognizer.cleanup();
    }
  }, []);

  useEffect(() => {
    if (imageData) {
      recognizeImage(imageData);
    }
  }, [imageData, recognizeImage]);

  return (
    <View>
      <Button title="Capture Image" onPress={handleCaptureImage} />
      {imageData && (
        <Image source={{ uri: imageData }} style={{ width: 200, height: 200 }} />
      )}
      <Text>Recognized Text: {recognizedText}</Text>
    </View>
  );
};

export default CarPlateScanner;
