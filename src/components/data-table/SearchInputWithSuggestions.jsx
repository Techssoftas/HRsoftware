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
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allUniqueValues, setAllUniqueValues] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  // Sync internal selectedValues with external value prop
  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValues(value);
    } else if (typeof value === 'string' && value.trim() !== '') {
      setSelectedValues(value.split(',').map(v => v.trim()));
    } else {
      setSelectedValues([]);
    }
  }, [value]);

  // Extract all unique values from data on initial load
  useEffect(() => {
    if (data && data.length > 0 && field) {
      const unique = [...new Set(data
        .map(item => item[field])
        .filter(val => val && String(val).trim() !== '')
      )];
      setAllUniqueValues(unique);
      // Reset suggestions to initial subset
      setSuggestions(unique.slice(0, 10));
    }
  }, [data, field]);

  // Handle input change with debounce
  const handleInputChange = useCallback(
    debounce((searchValue) => {
      const query = searchValue.toLowerCase();

      if (query.trim() === '') {
        setSuggestions(allUniqueValues.slice(0, 10));
      } else {
        const filtered = allUniqueValues.filter(item =>
          String(item).toLowerCase().includes(query)
        );
        setSuggestions(filtered.slice(0, 10));
      }
    }, 300),
    [allUniqueValues]
  );

  const toggleSelection = (val) => {
    let updated;
    if (selectedValues.includes(val)) {
      updated = selectedValues.filter(v => v !== val);
    } else {
      updated = [...selectedValues, val];
      // Clear input on selection
      setInputValue('');
      setSuggestions(allUniqueValues.slice(0, 10));
    }

    // Optimistically update local state to avoid flicker before prop update
    setSelectedValues(updated);

    // Notify parent
    onFilterChange(field, updated);
  };

  const removeSelection = (val) => {
    const updated = selectedValues.filter(v => v !== val);
    setSelectedValues(updated);
    onFilterChange(field, updated);
  };

  const onChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    handleInputChange(val);
    setShowSuggestions(true);
  };

  const onSuggestionClick = (suggestion) => {
    if (!selectedValues.includes(suggestion)) {
      const updated = [...selectedValues, suggestion];
      setSelectedValues(updated);
      onFilterChange(field, updated);
      setInputValue(''); // Clear input
      setSuggestions(allUniqueValues.slice(0, 10)); // Reset suggestions
    }
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (inputValue === '' && allUniqueValues.length > 0) {
      setSuggestions(allUniqueValues.slice(0, 10));
    }
    setShowSuggestions(true);
    setIsFocused(true);
  };

  return (
    <div className="position-relative me-2">
      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-md"
          placeholder={placeholder}
          style={{
            minWidth: '130px',
            borderColor: isFocused ? '#FE9F43' : '',
            boxShadow: isFocused ? '0 0 5px #fabe81' : ''
          }}
          value={inputValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 200);
            setIsFocused(false);
          }}
        />

        {/* Clear Button (only clears text input) */}
        {inputValue && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setInputValue('');
              handleInputChange('');
              setSuggestions(allUniqueValues.slice(0, 10));
            }}
            style={{
              borderLeft: 'none',
              backgroundColor: 'transparent'
            }}
          >
            <i className="feather icon-x" style={{ fontSize: '12px' }}></i>
          </button>
        )}
      </div>

      {/* Selected Values Badges */}
      {selectedValues.length > 0 && (
        <div className="d-flex flex-wrap mt-2 gap-2">
          {selectedValues.map((val, idx) => (
            <span
              key={idx}
              className="badge bg-outline-danger d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => removeSelection(val)}
            >
              <span className="badge-label">{val}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x ms-1" style={{ height: '12px', width: '12px' }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ))}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-lg z-3"
          style={{ maxHeight: '200px', overflowY: 'auto' }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 d-flex align-items-center hover-bg-light"
              style={{ cursor: 'pointer', backgroundColor: selectedValues.includes(suggestion) ? '#f0f0f0' : 'white' }}
              onClick={() => onSuggestionClick(suggestion)}
            >
              {selectedValues.includes(suggestion) && (
                <i className="feather icon-check text-success me-2" style={{ fontSize: '12px' }}></i>
              )}
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* No Matches Found */}
      {showSuggestions && suggestions.length === 0 && inputValue.length > 0 && (
        <div className="position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-lg z-3">
          <div className="px-3 py-2 text-muted">No matches found</div>
        </div>
      )}
    </div>
  );
};

export default SearchInputWithSuggestions;
