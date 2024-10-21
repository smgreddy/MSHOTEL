import React, { useState } from 'react';
import { UserList } from './UserList';
import { ItemList } from './ItemList';
import { Preview } from './Preview';
import { ButtonGroup } from './ButtonGroup';
import SaveButton from './SaveButton';
const App = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [savedUsers, setSavedUsers] = useState([]);
  const [savedItems, setSavedItems] = useState({});
  
  const dataToSave = {
    users: savedUsers, // Replace with actual user data
    items: savedItems,
  };


  const saveSelection = () => {
    const newSavedItems = { ...savedItems };

    selectedUsers.forEach((user) => {
      newSavedItems[user] = newSavedItems[user] || {};
      Object.keys(selectedItems).forEach((category) => {
        newSavedItems[user][category] = newSavedItems[user][category] || [];
        selectedItems[category].forEach((selectedItem) => {
          const index = newSavedItems[user][category].findIndex(
            (item) => item.name === selectedItem.name
          );
          if (index > -1) {
            newSavedItems[user][category][index].quantity +=
              selectedItem.quantity;
          } else {
            newSavedItems[user][category].push({
              ...selectedItem,
              quantity: selectedItem.quantity,
            });
          }
        });
      });
    });

    setSavedUsers([...new Set([...savedUsers, ...selectedUsers])]);
    setSavedItems(newSavedItems);
    setSelectedUsers([]);
    setSelectedItems({});
  };

  const resetSelection = () => {
    setSelectedUsers([]);
    setSelectedItems({});
  };

  const updateItemQuantity = (user, category, itemName, quantityChange) => {
    const updatedItems = { ...savedItems };
    if (updatedItems[user] && updatedItems[user][category]) {
      const itemIndex = updatedItems[user][category].findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex > -1) {
        const newQuantity =
          updatedItems[user][category][itemIndex].quantity + quantityChange;
        if (newQuantity > 0) {
          updatedItems[user][category][itemIndex].quantity = newQuantity;
        } else {
          updatedItems[user][category].splice(itemIndex, 1); // Remove item if quantity is 0
        }
        setSavedItems(updatedItems);
      }
    }
  };

  const removeItem = (user, category, itemName) => {
    alert('Remove Item:=' + user);
    const updatedItems = { ...savedItems };
    if (updatedItems[user] && updatedItems[user][category]) {
      updatedItems[user][category] = updatedItems[user][category].filter(
        (item) => item.name !== itemName
      );
      setSavedItems(updatedItems);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Cafeteria</h1>
      <div
        style={{
          display: 'flex',
          width: '80%',
          justifyContent: 'space-between',
          border: '1px solid #ccc',
          padding: '10px',
          gap: '10px',
        }}
      >
        <UserList
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />

        <ItemList
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <ButtonGroup
          saveSelection={saveSelection}
          resetSelection={resetSelection}
        />
      </div>
      <Preview
        savedUsers={savedUsers}
        savedItems={savedItems}
        updateItemQuantity={updateItemQuantity}
        removeItem={removeItem}
      />
      <h1>Save Data to MongoDB</h1>
      <SaveButton data={dataToSave} url="http://localhost:4000/save-selection" />
    </div>
  );
};

export default App;
