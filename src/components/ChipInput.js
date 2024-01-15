import React, { useRef, useState } from 'react';
import './ChipInput.css';

const ChipInput = () => {
  const allContacts = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Bob Johnson", email: "bob.johnson@example.com" },
    { name: "Alice Brown", email: "alice.brown@example.com" },
    { name: "Charlie Davis", email: "charlie.davis@example.com" },
    { name: "Eva White", email: "eva.white@example.com" },
    { name: "Frank Wilson", email: "frank.wilson@example.com" },
    { name: "Grace Miller", email: "grace.miller@example.com" },
    { name: "Henry Lee", email: "henry.lee@example.com" },
    { name: "Ivy Clark", email: "ivy.clark@example.com" },
  ];
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [suggestedContacts, setsuggestedContacts] = useState([...allContacts]);
  const lastChipRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter items based on user input
    const filteredItems = allContacts.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setsuggestedContacts(filteredItems);
  };

  const handleItemClick = (item) => {
    // Add item to chips and remove it from suggestions
    setChips([...chips, item]);
    setsuggestedContacts([...allContacts]);
    setInputValue('');
  };

  const handleChipRemove = (chip) => {
    // Remove chip and add the item back to suggestions
    setChips(chips.filter(c => c.name !== chip.name));
    setsuggestedContacts([...allContacts]);
  };

  const handleBackspace = () => {
    if (inputValue === '' && chips.length > 0) {
      // Highlight the last chip
      if (lastChipRef.current) {
        let occ = lastChipRef.current.getAttribute("alert");
        if (occ) {
          occ = parseInt(occ) + 1;
        }
        else {
          occ = 1;
        }
        lastChipRef.current.style.border = "1px solid blue";
        lastChipRef.current.style.backgroundColor = 'lightblue';
        lastChipRef.current.setAttribute("alert", occ);
        setTimeout(() => {
          if (lastChipRef.current) {
            lastChipRef.current.style.border = "";
            lastChipRef.current.style.backgroundColor = '';
          }
        }, 500);
      }
      console.log(lastChipRef.current);
      // Secound time remove chip
      if (lastChipRef.current && lastChipRef.current.getAttribute("alert") == "2") {
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip);
      }
    }
  };

  return (
    <div className="chips-input-wrapper">
      <div className="chips-input-container">
        <div className="chips-container">
          {chips.map((chip, index) => (
            <div key={index} className="chip" ref={index === chips.length - 1 ? lastChipRef : null}>
              {chip.name}
              <span className="chip-remove" onClick={() => handleChipRemove(chip)}>X</span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Backspace' && handleBackspace()}
          placeholder="Type to search..."
        />
        <div className="suggestions-list">
          {suggestedContacts.map((item, index) => (
            <div key={index} className="suggested-item" onClick={() => handleItemClick(item)} style={{
              display: chips.map(chip => chip.name).includes(item.name) ? "none" : ""
            }}>
              <div className='name'>{item.name}</div>
              <div className='emailId'>{item.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
