import React, { useState } from 'react';
import './SegmentCreator.css';

const SegmentCreator = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedLabel = availableSchemas.find(schema => schema.value === selectedSchema).label;
      setSchemas([...schemas, { label: selectedLabel, value: selectedSchema }]);
      setAvailableSchemas(availableSchemas.filter(schema => schema.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map(schema => ({ [schema.value]: schema.label })),
    };

    // Replace 'your-webhook-url' with your actual Webhook URL
    fetch('https://webhook.site/your-webhook-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => console.log('Segment saved', response));
  };

  return (
    <div>
      <button className="save-segment-btn" onClick={() => setShowPopup(true)}>
        Save segment
      </button>
      
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Saving Segment</h3>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="segment-name-input"
            />
            <div className="schemas-box">
              {schemas.map((schema, index) => (
                <div key={index} className="schema-dropdown">
                  <select
                    value={schema.value}
                    onChange={(e) => {
                      const newSchemas = [...schemas];
                      newSchemas[index].value = e.target.value;
                      setSchemas(newSchemas);
                    }}
                    className="dropdown"
                  >
                    {[...availableSchemas, schema].map(s => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="add-schema-container">
              <select
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
                className="dropdown"
              >
                <option value="">Add schema to segment</option>
                {availableSchemas.map(schema => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
              <button className="add-schema-btn" onClick={handleAddSchema}>
                + Add new schema
              </button>
            </div>
            <div className="popup-buttons">
              <button className="save-btn" onClick={handleSaveSegment}>Save the Segment</button>
              <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentCreator;
