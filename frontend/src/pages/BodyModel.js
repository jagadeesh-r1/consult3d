import React, { useState } from 'react';
import './BodyModel.css';

const BodyModel = ({ onRegionSelect, selectedRegions, gender }) => {
  const [selected, setSelected] = useState(selectedRegions || []);

  const female_bodyParts = {
    // Head and neck
    head: { id: 'head', element: <circle cx="100" cy="15" r="30" /> },
    neck: { id: 'neck', element: <rect x="90" y="45" width="20" height="15" /> },
    
    // Torso
    chest: { id: 'chest', element: <rect x="65" y="60" width="70" height="70" /> },
    stomach: { id: 'stomach', element: <rect x="65" y="130" width="70" height="70" /> },
    lowerAbdomen: { id: 'lowerAbdomen', element: <rect x="70" y="200" width="60" height="30" /> },
    
    // Left arm
    leftShoulder: { id: 'leftShoulder', element: <rect x="47" y="65" width="20" height="30" /> },
    leftBicep: { id: 'leftBicep', element: <rect x="45" y="95" width="20" height="40" /> },
    leftElbow: { id: 'leftElbow', element: <rect x="45" y="140" width="20" height="15" /> },
    leftForearm: { id: 'leftForearm', element: <rect x="35" y="155" width="20" height="55" transform="rotate(10, 45, 182.5)" /> },
    leftWrist: { id: 'leftWrist', element: <rect x="32" y="210" width="20" height="20" /> },
    leftHand: { id: 'leftHand', element: <rect x="25" y="227" width="25" height="30" /> },
    
    // Right arm
    rightShoulder: { id: 'rightShoulder', element: <rect x="135" y="65" width="20" height="30" /> },
    rightBicep: { id: 'rightBicep', element: <rect x="137" y="95" width="20" height="40" /> },
    rightElbow: { id: 'rightElbow', element: <rect x="137" y="140" width="20" height="15" /> },
    rightForearm: { id: 'rightForearm', element: <rect x="140" y="175" width="20" height="55" transform="rotate(-10, 45, 182.5)" /> },
    rightWrist: { id: 'rightWrist', element: <rect x="148" y="210" width="20" height="20" /> },
    rightHand: { id: 'rightHand', element: <rect x="150" y="227" width="25" height="30" /> },
    
    // Left leg
    leftThigh: { id: 'leftThigh', element: <rect x="55" y="230" width="40" height="80" /> },
    leftKnee: { id: 'leftKnee', element: <rect x="65" y="310" width="20" height="20" /> },
    leftShin: { id: 'leftShin', element: <rect x="65" y="330" width="20" height="90" /> },
    leftAnkle: { id: 'leftAnkle', element: <rect x="70" y="420" width="20" height="10" /> },
    leftFoot: { id: 'leftFoot', element: <rect x="63" y="435" width="30" height="30" /> },
    
    // Right leg
    rightThigh: { id: 'rightThigh', element: <rect x="105" y="230" width="40" height="80" /> },
    rightKnee: { id: 'rightKnee', element: <rect x="115" y="310" width="20" height="20" /> },
    rightShin: { id: 'rightShin', element: <rect x="115" y="330" width="20" height="90" /> },
    rightAnkle: { id: 'rightAnkle', element: <rect x="110" y="420" width="20" height="10" /> },
    rightFoot: { id: 'rightFoot', element: <rect x="113" y="435" width="30" height="30" /> }
  };

  const male_bodyParts = {
    // Head and neck
    head: { id: 'head', element: <circle cx="100" cy="15" r="30" /> },
    neck: { id: 'neck', element: <rect x="85" y="45" width="30" height="15" /> },
    
    // Torso
    chest: { id: 'chest', element: <rect x="65" y="60" width="70" height="70" /> },
    stomach: { id: 'stomach', element: <rect x="65" y="130" width="70" height="70" /> },
    lowerAbdomen: { id: 'lowerAbdomen', element: <rect x="70" y="200" width="60" height="30" /> },
    
    // Left arm
    leftShoulder: { id: 'leftShoulder', element: <rect x="35" y="65" width="30" height="40" /> },
    leftBicep: { id: 'leftBicep', element: <rect x="34" y="105" width="20" height="40" /> },
    leftElbow: { id: 'leftElbow', element: <rect x="32" y="143" width="20" height="15" /> },
    leftForearm: { id: 'leftForearm', element: <rect x="28" y="157" width="20" height="65" transform="rotate(10, 45, 182.5)" /> },
    leftWrist: { id: 'leftWrist', element: <rect x="23" y="220" width="20" height="20" /> },
    leftHand: { id: 'leftHand', element: <rect x="16" y="235" width="30" height="40" /> },
    
    // Right arm
    rightShoulder: { id: 'rightShoulder', element: <rect x="135" y="65" width="30" height="40" /> },
    rightBicep: { id: 'rightBicep', element: <rect x="147" y="105" width="20" height="40" /> },
    rightElbow: { id: 'rightElbow', element: <rect x="147" y="143" width="20" height="15" /> },
    rightForearm: { id: 'rightForearm', element: <rect x="152" y="177" width="20" height="65" transform="rotate(-8, 45, 182.5)" /> },
    rightWrist: { id: 'rightWrist', element: <rect x="157" y="220" width="20" height="20" /> },
    rightHand: { id: 'rightHand', element: <rect x="157" y="235" width="30" height="40" /> },
    
    // Left leg
    leftThigh: { id: 'leftThigh', element: <rect x="55" y="230" width="40" height="80" /> },
    leftKnee: { id: 'leftKnee', element: <rect x="65" y="310" width="20" height="20" /> },
    leftShin: { id: 'leftShin', element: <rect x="65" y="330" width="20" height="90" /> },
    leftAnkle: { id: 'leftAnkle', element: <rect x="70" y="420" width="20" height="10" /> },
    leftFoot: { id: 'leftFoot', element: <rect x="63" y="435" width="30" height="30" /> },
    
    // Right leg
    rightThigh: { id: 'rightThigh', element: <rect x="105" y="230" width="40" height="80" /> },
    rightKnee: { id: 'rightKnee', element: <rect x="115" y="310" width="20" height="20" /> },
    rightShin: { id: 'rightShin', element: <rect x="115" y="330" width="20" height="90" /> },
    rightAnkle: { id: 'rightAnkle', element: <rect x="110" y="420" width="20" height="10" /> },
    rightFoot: { id: 'rightFoot', element: <rect x="113" y="435" width="30" height="30" /> }
  };

  const bodyParts = gender === 'female' ? female_bodyParts : male_bodyParts;
  const bodyImage = gender === 'female' ? "https://innerbody.imgix.net/integumentary_system.png" : "https://innerbody.imgix.net/integumentary_system_male_view.png";

  const handleRegionClick = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter(region => region !== id)
      : [...selected, id];
    setSelected(newSelected);
    onRegionSelect(newSelected);
  };

  return (
    <div className="body-model">
      <img src={bodyImage} alt={`${gender} body`} className="body-image" />
      <svg className="body-svg" viewBox="0 0 200 500">
        {Object.values(bodyParts).map(part => (
          <g
            key={part.id}
            className={`body-part ${selected.includes(part.id) ? 'selected' : ''}`}
            onClick={() => handleRegionClick(part.id)}
          >
            {part.element}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default BodyModel;