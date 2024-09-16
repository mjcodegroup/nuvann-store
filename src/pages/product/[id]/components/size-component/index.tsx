import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: any) => void;
}

const SizeComponent: React.FC<Props> = ({ sizes, selectedSize, onSelectSize }) => {
  const { t } = useTranslation();
  return (
    <>
    {
      sizes?.length ? 
      <p style={{
       color: '#757575',
       width: '110px',
       textTransform: 'capitalize',
       flexShrink: '0',
       alignItems: 'center',
      }}>{t('details.sizes')}: </p>
      :
      ''
    }

    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
      {sizes?.map((size:any, index:number) => (
        <SizeCircle
        key={index}
        size={size.value}
        selected={selectedSize === size.value}
        onSelectSize={onSelectSize}
        />
        ))}
    </div>
        </>
  );
};

interface CircleProps {
  size: string;
  selected: boolean;
  onSelectSize: (size: string) => void;
}

const SizeCircle: React.FC<CircleProps> = ({ size, selected, onSelectSize }) => {
  const { t } = useTranslation();
  const [verified, setVerified] = useState(false);
  const handleClick = () => {
    onSelectSize(size);
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
          minWidth: '4rem',
          border: selected ? '1px solid #000052' : '1px solid rgba(0, 0, 0, 0.09)',
          minHeight: '2.025rem',
          borderRadius: '2px',
          // backgroundColor: !selected ? 'none' : 'rgb(255, 255, 255)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.8)',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {size}

          {selected && verified && (
          <div
            style={{
              position: 'relative',
              width: '10px',
              right: '-5px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#000052',
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

export default SizeComponent;