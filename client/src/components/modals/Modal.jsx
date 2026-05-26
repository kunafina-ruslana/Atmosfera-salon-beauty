import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  const { isDark } = useTheme();
  
  if (!isOpen) return null;

  const sizes = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '500px' },
    large: { maxWidth: '700px' },
    xlarge: { maxWidth: '900px' }
  };

  const modalBgColor = isDark ? '#1e2a3a' : '#ffffff';
  const textColor = isDark ? '#e0e0e0' : '#4a4a4a';
  const borderColor = isDark ? '#2a3a4a' : '#e8e0d3';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: modalBgColor,
          borderRadius: '16px',
          padding: '24px',
          width: '90%',
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: `1px solid ${borderColor}`,
          color: textColor,
          ...sizes[size]
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: `1px solid ${borderColor}`
          }}
        >
          <h2 style={{ margin: 0, fontSize: '24px', color: textColor }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: isDark ? '#999' : '#8b8b8b',
              transition: 'color 0.3s',
              padding: '4px 8px',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#fff' : '#4a4a4a'}
            onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#999' : '#8b8b8b'}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;