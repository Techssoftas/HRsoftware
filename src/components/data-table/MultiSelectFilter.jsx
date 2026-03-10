import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const MultiSelectFilter = ({
  placeholder = "Select",
  options = [],
  selectedValues = [],
  onChange,
  loading = false,
  maxSelectedLabels = 2,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Format options to ensure they have label and value - memoized to prevent unnecessary recalculations
  const formattedOptions = useMemo(() => {
    return options.map(opt => {
      if (typeof opt === 'string') {
        return { label: opt, value: opt };
      }
      return {
        label: opt.label || String(opt.value || opt),
        value: opt.value || opt.id || opt,
        code: opt.code,
        ...opt
      };
    });
  }, [options]);

  // Filter options based on search - memoized
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return formattedOptions;
    
    return formattedOptions.filter(opt =>
      String(opt.label).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [formattedOptions, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(''); // Clear search when closing
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  const toggleOption = useCallback((option) => {
    const value = option.value;
    let newSelectedValues;
    
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(v => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    
    onChange(newSelectedValues);
  }, [selectedValues, onChange]);

  const selectAll = useCallback(() => {
    const allValues = formattedOptions.map(opt => opt.value);
    onChange(allValues);
    setIsOpen(false);
  }, [formattedOptions, onChange]);

  const clearAll = useCallback(() => {
    onChange([]);
    setIsOpen(false);
  }, [onChange]);

  const removeSelected = useCallback((value, e) => {
    e.stopPropagation();
    const newSelectedValues = selectedValues.filter(v => v !== value);
    onChange(newSelectedValues);
  }, [selectedValues, onChange]);

  const getSelectedLabels = useCallback(() => {
    const selected = formattedOptions.filter(opt => selectedValues.includes(opt.value));
    
    if (selected.length === 0) return placeholder;
    if (selected.length <= maxSelectedLabels) {
      return selected.map(s => s.label).join(', ');
    }
    return `${selected.length} selected`;
  }, [formattedOptions, selectedValues, placeholder, maxSelectedLabels]);

  const renderOptionContent = useCallback((option) => {
    if (renderOption) {
      return renderOption(option);
    }
    return option.label;
  }, [renderOption]);

  return (
    <div className="position-relative" ref={dropdownRef} style={{ minWidth: '200px' }}>
      {/* Selected values display */}
      <div
        className="form-control d-flex align-items-center justify-content-between cursor-pointer"
        onClick={() => !loading && setIsOpen(!isOpen)}
        style={{
          cursor: loading ? 'wait' : 'pointer',
          backgroundColor: 'white',
          minHeight: '38px',
          padding: '0.375rem 0.75rem',
          borderColor: selectedValues.length > 0 ? '#FE9F43' : '#dee2e6',
          opacity: loading ? 0.7 : 1
        }}
      >
        <div className="d-flex flex-wrap gap-1 align-items-center" style={{ maxWidth: 'calc(100% - 20px)' }}>
          {loading ? (
            <span className="text-muted">Loading...</span>
          ) : selectedValues.length > 0 ? (
            <>
              {selectedValues.slice(0, maxSelectedLabels).map(value => {
                const option = formattedOptions.find(opt => opt.value === value);
                return option ? (
                  <span
                    key={value}
                    className="badge bg-soft-primary d-inline-flex align-items-center"
                    style={{ padding: '0.25rem 0.5rem', marginRight: '4px' }}
                  >
                    {option.label}
                    <i
                      className="feather icon-x ms-1"
                      style={{ fontSize: '12px', cursor: 'pointer' }}
                      onClick={(e) => removeSelected(value, e)}
                    ></i>
                  </span>
                ) : null;
              })}
              {selectedValues.length > maxSelectedLabels && (
                <span className="badge bg-secondary">
                  +{selectedValues.length - maxSelectedLabels}
                </span>
              )}
            </>
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </div>
        {!loading && (
          <i className={`feather icon-chevron-${isOpen ? 'up' : 'down'} ms-2`} style={{ fontSize: '14px' }}></i>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && !loading && (
        <div
          className="position-absolute top-100 start-0 mt-1 w-100 bg-white border rounded shadow-lg z-3"
          style={{ maxHeight: '350px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          {/* Search input */}
          <div className="p-2 border-bottom">
            <input
              ref={searchInputRef}
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              value={searchTerm || ''} // Ensure value is never null
              onChange={(e) => setSearchTerm(e.target.value || '')}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Action buttons */}
          <div className="p-2 border-bottom d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary flex-grow-1"
              onClick={selectAll}
              type="button"
            >
              Select All
            </button>
            <button
              className="btn btn-sm btn-outline-secondary flex-grow-1"
              onClick={clearAll}
              type="button"
            >
              Clear
            </button>
          </div>

          {/* Options list */}
          <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-3 py-2 d-flex align-items-center hover-bg-light"
                  style={{ 
                    cursor: 'pointer', 
                    backgroundColor: selectedValues.includes(option.value) ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="flex-grow-1">{renderOptionContent(option)}</span>
                  {selectedValues.includes(option.value) && (
                    <i className="feather icon-check text-success ms-2" style={{ fontSize: '14px' }}></i>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-3 text-muted">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;