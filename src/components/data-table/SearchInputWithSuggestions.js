import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from '../../utils/filterUtils';

const SearchInputWithSuggestions = ({
  placeholder,
  field,
  data,
  onFilterChange,
  value,
  uniqueValues = [],
  minCharsForSuggestions = 1
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allUniqueValues, setAllUniqueValues] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);



  // Extract all unique values from data on initial load
  useEffect(() => {
    if (data && data.length > 0 && field) {
      const unique = [...new Set(data
        .map(item => item[field])
        .filter(value => value && value.trim() !== '')
      )];
      setAllUniqueValues(unique);
      setSuggestions(unique.slice(0, 10));
    }
  }, [data, field]);

  // Handle input change with debounce
  const handleInputChange = useCallback(
    debounce((value) => {
     
      
      if (value.trim() === '') {
        setSuggestions(allUniqueValues.slice(0, 10));
      } else if (value.length >= minCharsForSuggestions) {
        const filtered = allUniqueValues.filter(item => 
          String(item).toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 10));
      } else {
        const filtered = allUniqueValues.filter(item => 
          String(item).toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 10));
      }
    }, 300),
    [allUniqueValues, field, onFilterChange, minCharsForSuggestions]
  );
const toggleSelection = (value) => {
  let updated;

  if (selectedValues.includes(value)) {
    updated = selectedValues.filter(v => v !== value);
  } else {
    updated = [...selectedValues, value];
  }

  setSelectedValues(updated);
  onFilterChange(field, updated); // send array to parent
};

  const onChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleInputChange(value);
  };

  const onSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onFilterChange(field, suggestion);
    setShowSuggestions(false);
  };

const onClear = () => {
  setInputValue('');
  setSelectedValues([]);              
  onFilterChange(field, []);     
  setSuggestions(allUniqueValues.slice(0, 10));
};


  const handleFocus = () => {
    if (inputValue === '' && allUniqueValues.length > 0) {
      setSuggestions(allUniqueValues.slice(0, 10));
    }
    setShowSuggestions(true);
  };

  return React.createElement(
    'div',
    { className: 'position-relative me-2' },
    React.createElement(
      'div',
      { className: 'input-group' },
     React.createElement('input', {
  type: 'text',
  className: 'form-control form-control-md',
  placeholder: placeholder,
style: { 
  minWidth: '130px',
  borderColor: (selectedValues.length > 0 || isFocused) ? '#FE9F43' : '',
  boxShadow: (selectedValues.length > 0 || isFocused) ? '0 0 5px #fabe81' : ''
},


value: selectedValues.join(', '),



  onChange: onChange,
  onFocus: () => {
    handleFocus();
    setIsFocused(true);
  },
  onBlur: () => {
    setTimeout(() => setShowSuggestions(false), 200);
    setIsFocused(false);
  }
}),
    
    showSuggestions && suggestions.length > 0 && React.createElement(
      'div',
      {
        className: 'position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-lg z-3',
        style: { maxHeight: '200px', overflowY: 'auto' }
      },
     suggestions.map((suggestion, index) =>
  React.createElement(
    'div',
    {
      key: index,
      className: 'px-3 py-2 d-flex align-items-center',
      style: { cursor: 'pointer' }
    },
    React.createElement('input', {
      type: 'checkbox',
      checked: selectedValues.includes(suggestion),
      onChange: () => toggleSelection(suggestion),
      style: { marginRight: '8px' }
    }),
    suggestion
  )
)

    ),

     (selectedValues.length > 0 || inputValue) && React.createElement(

        'button',
        {
          className: 'btn btn-outline-secondary',
          type: 'button',
          onClick: onClear,
          style: {
            borderLeft: 'none',
            backgroundColor: 'transparent'
          }
        },
        React.createElement('i', {
          className: 'feather icon-x',
          style: { fontSize: '12px' }
        })
      )
    ),
    showSuggestions && suggestions.length === 0 && inputValue.length > 0 && React.createElement(
      'div',
      {
        className: 'position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-lg z-3'
      },
      React.createElement(
        'div',
        { className: 'px-3 py-2 text-muted' },
        'No matches found'
      )
    )
  );
};

export default SearchInputWithSuggestions;