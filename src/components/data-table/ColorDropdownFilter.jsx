import React, { useState, useEffect } from 'react';

const ColorDropdownFilter = ({
  data,
  onColorChange,
  selectedColor,
  colorField = 'color_name'
}) => {
  const [colorOptions, setColorOptions] = useState([]);

  // Extract unique colors from data
  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueColors = [...new Set(data
        .map(item => item[colorField])
        .filter(color => color && color.trim() !== '')
        .sort()
      )];
      
      const options = [
        { value: '', label: 'All Colors' },
        ...uniqueColors.map(color => ({
          value: color,
          label: color
        }))
      ];
      
      setColorOptions(options);
    }
  }, [data, colorField]);

  const handleColorChange = (colorValue) => {
    onColorChange(colorValue);
  };

  return React.createElement(
    'div',
    { className: 'dropdown me-2' },
    React.createElement(
      'button',
      {
        className: 'btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle',
        type: 'button',
        'data-bs-toggle': 'dropdown',
        'aria-expanded': 'false',
        style: { 
          minWidth: '130px',
          border: '1px solid #d1d5db',
          backgroundColor: '#f3f4f6',
          color: selectedColor ? '#111827' : '#6b7280',
          fontWeight: selectedColor ? '500' : '400'
        }
      },
      selectedColor 
        ? React.createElement(React.Fragment, null,
            React.createElement('span', {
              className: 'me-2 rounded-circle',
              style: {
                width: '12px',
                height: '12px',
                backgroundColor: selectedColor.toLowerCase(),
                display: 'inline-block',
                border: '1px solid #d1d5db'
              }
            }),
            (colorOptions.find(opt => opt.value === selectedColor)?.label || 'Color')
          )
        : 'Color'
    ),
    React.createElement(
      'ul',
      {
        className: 'dropdown-menu dropdown-menu-end p-0',
        style: { 
          maxHeight: '300px', 
          overflowY: 'auto',
          minWidth: '150px',
          border: '1px solid #d1d5db'
        }
      },
      colorOptions.length > 0 
        ? colorOptions.map((color) =>
            React.createElement(
              'li',
              { key: color.value },
              React.createElement(
                'button',
                {
                  // Using custom class 'color-dropdown-active' instead of 'active'
                  className: `dropdown-item d-flex align-items-center ${selectedColor === color.value ? 'color-dropdown-active' : ''}`,
                  onClick: () => handleColorChange(color.value),
                  style: { 
                    cursor: 'pointer',
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    borderRadius: '0'
                  }
                },
                color.value && React.createElement('span', {
                  className: 'me-2 rounded-circle',
                  style: {
                    width: '12px',
                    height: '12px',
                    backgroundColor: color.value.toLowerCase(),
                    display: 'inline-block',
                    border: '1px solid #d1d5db'
                  }
                }),
                color.label
              )
            )
          )
        : React.createElement(
            'li',
            null,
            React.createElement(
              'div',
              { 
                className: 'dropdown-item text-muted',
                style: { 
                  padding: '8px 12px',
                  fontSize: '0.875rem'
                }
              },
              'No colors found'
            )
          )
    )
  );
};

export default ColorDropdownFilter;