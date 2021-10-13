import React, { useState, useEffect } from 'react';

const ColorMode = () => {
  const [colorMode, setColorMode] = useState('light');
  const handleModeToggle = () => {
    setColorMode((mode) => (mode === 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    colorMode === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');

    return () => {
      document.body.classList.remove('dark');
    };
  }, [colorMode]);
  return (
    <div className='color-mode-wpr'>
      <input
        className='color-mode__checkbox'
        id='colorMode'
        type='checkbox'
        onChange={handleModeToggle}
      />
      <label className='color-mode__label' htmlFor='colorMode'>
        {colorMode}
      </label>
    </div>
  );
};

export default ColorMode;
