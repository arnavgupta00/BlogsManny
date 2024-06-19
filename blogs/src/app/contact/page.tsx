import React from "react";

export default function Component() {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <h2 style={cardTitleStyle}>Contact Us</h2>
        <p style={cardDescriptionStyle}>Enter your details below.</p>
      </div>
      <div style={cardContentStyle}>
        <div style={contentGridStyle}>
          <div style={{ ...inputGroupStyle, flexDirection: 'column' }}>
            <label htmlFor="first-name" className="text-gray-50" style={labelStyle}>First name</label>
            <input id="first-name" className="bg-black" placeholder="First name" style={inputStyle} />
          </div>
          <div style={{ ...inputGroupStyle, flexDirection: 'column' }}>
            <label htmlFor="last-name" className="text-gray-50" style={labelStyle}>Last name</label>
            <input id="last-name" className="bg-black" placeholder="Last name" style={inputStyle} />
          </div>
          <div style={{ ...inputGroupStyle, flexDirection: 'column' }}>
            <label htmlFor="email" className="text-gray-50" style={labelStyle}>Email</label>
            <input id="email" className="bg-black" placeholder="Email" type="email" style={inputStyle} />
          </div>
        </div>
        <div style={{ ...inputGroupStyle, flexDirection: 'column' }}>
          <label htmlFor="message" className="text-gray-50" style={labelStyle}>Message</label>
          <textarea className="min-h-[100px] bg-black " id="message" placeholder="Enter your message" style={{ ...inputStyle, minHeight: '100px' }} />
        </div>
      </div>
      <div style={{textAlign: 'right'}}>
        <button style={buttonStyle}>Submit</button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  maxWidth: '600px',
  margin: 'auto',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const cardHeaderStyle = {
  marginBottom: '16px'
};

const cardTitleStyle = {
  margin: '0',
  fontSize: '24px',
  fontWeight: '600'
};

const cardDescriptionStyle = {
  margin: '0',
  color: '#6b7280'
};

const cardContentStyle = {
  marginBottom: '16px'
};

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  marginBottom: '16px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151'
};

const inputStyle = {
  padding: '8px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  fontSize: '14px'
};

const cardFooterStyle = {
  textAlign: 'right'
};

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#000000',
  backgroundColor: '#ffffff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
