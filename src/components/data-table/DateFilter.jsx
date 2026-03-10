// Create a new file: src/components/data-table/DateFilter.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DateFilter = ({ 
  onApply, 
  onClear, 
  initialSingleDate = '',
  initialFromDate = '',
  initialToDate = '',
  filterType = 'single' // 'single' or 'range'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilterType, setLocalFilterType] = useState(filterType);
  
  // Single date state
  const [singleDate, setSingleDate] = useState(initialSingleDate);
  
  // Range date state
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);

  const hasActiveFilter = localFilterType === 'single' 
    ? singleDate !== ''
    : (fromDate !== '' || toDate !== '');

  const handleApply = () => {
    if (localFilterType === 'single' && singleDate) {
      onApply({ type: 'single', date: singleDate });
    } else if (localFilterType === 'range' && (fromDate || toDate)) {
      onApply({ type: 'range', fromDate, toDate });
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setSingleDate('');
    setFromDate('');
    setToDate('');
    onClear();
    setIsOpen(false);
  };

  const handleTypeChange = (type) => {
    setLocalFilterType(type);
    // Clear the other type's values
    if (type === 'single') {
      setFromDate('');
      setToDate('');
    } else {
      setSingleDate('');
    }
  };

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('/').join('-');
  };

  // Get button label based on active filter
  const getButtonLabel = () => {
    if (!hasActiveFilter) return 'PO Date';
    
    if (localFilterType === 'single') {
      return formatDisplayDate(singleDate);
    } else {
      const from = fromDate ? formatDisplayDate(fromDate) : '...';
      const to = toDate ? formatDisplayDate(toDate) : '...';
      return `${from} - ${to}`;
    }
  };

  return (
    <div className="dropdown d-inline-block me-2">
      <button
        className={`btn btn-sm dropdown-toggle d-flex align-items-center ${
          hasActiveFilter ? 'btn-primary' : 'btn-outline-secondary'
        }`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minWidth: '140px' }}
      >
        <i className="feather icon-calendar me-2"></i>
        <span className="text-truncate" style={{ maxWidth: '100px' }}>
          {getButtonLabel()}
        </span>
        {hasActiveFilter && (
          <span className="badge bg-light text-dark ms-2 rounded-pill">1</span>
        )}
      </button>

      {isOpen && (
        <div 
          className="dropdown-menu show p-3" 
          style={{ 
            minWidth: '300px',
            position: 'absolute',
            inset: '0px auto auto 0px',
            margin: '0px',
            transform: 'translate(0px, 40px)',
            zIndex: 1000
          }}
        >
          {/* Filter Type Toggle */}
          <div className="btn-group mb-3 w-100">
            <button
              className={`btn btn-sm ${localFilterType === 'single' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => handleTypeChange('single')}
            >
              Single Date
            </button>
            <button
              className={`btn btn-sm ${localFilterType === 'range' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => handleTypeChange('range')}
            >
              Date Range
            </button>
          </div>

          {localFilterType === 'single' ? (
            // Single Date Input
            <div className="mb-3">
              <label className="form-label fw-semibold mb-2">Select Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
              />
            </div>
          ) : (
            // Date Range Inputs
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold mb-2">From Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  max={toDate || undefined}
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold mb-2">To Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate || undefined}
                />
              </div>
            </>
          )}

          <div className="d-flex justify-content-end gap-2">
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={handleClear}
            >
              Clear
            </button>
            <button 
              className="btn btn-sm btn-primary" 
              onClick={handleApply}
              disabled={
                (localFilterType === 'single' && !singleDate) ||
                (localFilterType === 'range' && !fromDate && !toDate)
              }
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DateFilter.propTypes = {
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  initialSingleDate: PropTypes.string,
  initialFromDate: PropTypes.string,
  initialToDate: PropTypes.string,
  filterType: PropTypes.oneOf(['single', 'range'])
};

export default DateFilter;