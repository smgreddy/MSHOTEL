import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './msstyles.css';

export const ItemList = ({ selectedItems, setSelectedItems }) => {
  const items = {
    Tiffins: [
      { id: 100, name: '2 Idly & * 2 Bonda', price: 30 },
      { id: 101, name: '2 Idly & * 2 Vada', price: 35 },
      { id: 102, name: '2 Bonda & * 2 Vada', price: 35 },
      { id: 103, name: '4 Idly', price: 30 },
      { id: 104, name: '4 Bonda', price: 30 },
      { id: 105, name: '4 Vada', price: 40 },
      { id: 106, name: '2 Idly', price: 15 },
      { id: 109, name: '2 Bonda', price: 15 },
      { id: 107, name: '2 Vada', price: 20 },
      { id: 108, name: 'Idly & * Vada', price: 20 },
      { id: 109, name: 'Idly & * Bonda', price: 20 },
      { id: 110, name: 'Bonda & * Vada', price: 20 },
    ],
    Lunch: [
      { id: 201, name: 'Thali * Veg', price: 120 },
      { id: 202, name: 'Thali * NonVeg', price: 150 },
      { id: 203, name: 'Chapathi * Veg', price: 100 },
      { id: 204, name: 'Chapathi * Chicken', price: 120 },
      { id: 205, name: 'Brown Rice * Veg', price: 100 },
      { id: 206, name: 'Brown Rice * Egg', price: 140 },
      { id: 207, name: 'Brown Rice * Chicken', price: 160 },
      { id: 208, name: 'Biryani * Veg', price: 150 },
      { id: 209, name: 'Biryani * Chicken', price: 200 },
      { id: 210, name: 'Fried Rice * Veg', price: 100 },
      { id: 211, name: 'Fried Rice * Sing Egg', price: 120 },
      { id: 212, name: 'Fried Rice * Doub Egg', price: 140 },
      { id: 213, name: 'Fried Rice * Chicken', price: 150 },
      { id: 214, name: 'Noodles * Veg', price: 100 },
      { id: 215, name: 'Noodles * Sing Egg', price: 120 },
      { id: 216, name: 'Noodles * Doub Egg', price: 140 },
      { id: 217, name: 'Noodles * Chicken', price: 150 },
      { id: 218, name: 'Salad * Veg', price: 80 },
      { id: 219, name: 'Salad * Egg', price: 120 },
      { id: 220, name: 'Salad * Chicken', price: 140 },
      { id: 221, name: 'Sandwich * Veg', price: 80 },
      { id: 222, name: 'Sandwich * Chicken', price: 100 },
      { id: 223, name: 'Club Sandwich * Veg', price: 120 },
      { id: 224, name: 'Club Sandwich * NonVeg', price: 120 },
      { id: 225, name: 'Fruit Bowl', price: 80 },
    ],
    Drinks: [
      { id: 300, name: 'Tea Small', price: 8 },
      { id: 301, name: 'Tea Large', price: 12 },
      { id: 302, name: 'Coffee', price: 20 },
      { id: 303, name: 'Milk', price: 12 },
      { id: 304, name: 'Water Btl * Small', price: 10 },
      { id: 305, name: 'Water Btl * Large', price: 20 },
      { id: 306, name: 'Juice * WaterMeln', price: 50 },
      { id: 307, name: 'Juice * Grapes', price: 50 },
      { id: 308, name: 'Juice * PineApple', price: 50 },
      { id: 309, name: 'Juice * Musk Meln', price: 60 },
      { id: 310, name: 'Juice * Mango', price: 60 },
      { id: 311, name: 'Juice * Banana', price: 60 },
      { id: 312, name: 'Juice * Apple', price: 80 },
      { id: 313, name: 'Juice * Sapota', price: 80 },
      { id: 314, name: 'Juice * Pomegrant', price: 80 },
      { id: 315, name: 'Juice * Carrot', price: 80 },
      { id: 316, name: 'Juice * Beet Root', price: 80 },
    ],
  };

  const handleItemChange = (category, item) => {
    const updatedItems = { ...selectedItems };
    if (!updatedItems[category]) {
      updatedItems[category] = [];
    }

    const itemIndex = updatedItems[category].findIndex(
      (i) => i.name === item.name
    );

    if (itemIndex === -1) {
      // Item is not selected, so we add it
      updatedItems[category].push({ ...item, quantity: 1 });
    } else {
      // Item is already selected, so we remove it (deselect)
      updatedItems[category].splice(itemIndex, 1);
    }

    // If a category is empty after removing an item, remove the category from selectedItems
    if (updatedItems[category].length === 0) {
      delete updatedItems[category];
    }

    setSelectedItems(updatedItems);
  };

  const isItemChecked = (category, itemName) => {
    return selectedItems[category]?.some((i) => i.name === itemName) || false;
  };

  return (
    <div className="list-box item-list-box">
      <h3>Items List</h3>
      {Object.keys(items).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {items[category].map((item) => (
            <FormControlLabel
              key={item.name}
              control={
                <Checkbox
                  id={`${category}-${item.name}`}
                  onChange={() => handleItemChange(category, item)}
                  checked={isItemChecked(category, item.name)}
                />
              }
              label={`${item.name} - ₹${item.price}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
