import React, { useState } from 'react';

interface Props {
  colors: string[];
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
}

const ColorComponent: React.FC<Props> = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <>
      { colors?.length ? 
      <p style={{
       color: '#757575',
       width: '110px',
       textTransform: 'capitalize',
       flexShrink: '0',
       alignItems: 'center',
      }}>Koulè: </p>
      :  ''}
    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {colors?.map((color:any, index:number) => (
        <ColorCircle
        key={index}
        color={color.value}
        selected={selectedColor == color.value}
        onSelectColor={onSelectColor}
        />
        ))}
    </div>
        </>
  );
};

interface CircleProps {
  color: string;
  selected: boolean;
  onSelectColor: (color: string) => void;
}

const ColorCircle: React.FC<CircleProps> = ({ color, selected, onSelectColor }) => {
  const [verified, setVerified] = useState(false);
  const handleClick = () => {
    onSelectColor(color);
    setVerified(true);
  };

  return (
    <section>

      <div
        style={{
          marginTop: '16px',
          marginBottom: '16px',
          marginRight: '8px',
          flexWrap: 'wrap',
          minWidth: '2.025rem',
          minHeight: '2.025rem',
          border: selected ? '2px solid #000052' : '1px solid gray',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#ffffff',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {/* {color} */}

          {selected && verified && (
          <div
            style={{
              position: 'relative',
              width: '15px',
              height: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#fff',
            }}
            >
            ✓
          </div>
        )}
      </div>
    </section>
  );
};

export default ColorComponent;